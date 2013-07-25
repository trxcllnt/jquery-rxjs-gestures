var Rx = require('rx');
var _ = require('underscore');
var $ = require('jquery');
var epsilon = require('../geom/epsilon');

module.exports = function(activation_time, distance) {
	
	// The time to wait until the we consider the press activated.
	if(activation_time === undefined) activation_time = 0;
	// The distance from the origin the pointing device is
	// allowed to move and still activate the press gesture.
	if(distance === undefined) distance = { x: 10, y: 10 };
	
	var target = $(this);
	
	if(activation_time <= 0) return target.downAsObservable();
	
	// The down Observable activates the press.
	var down = target.downAsObservable();
	
	// The move Observable cancels the press if the user moves their
	// pointing device too far away from the origin before the press
	// activation time is reached.
	var move = target.moveAsObservable();
	
	// The end Observable cancels the press if the user releases their
	// pointing device before the press activation time is reached.
	var end = target.endAsObservable();
	
	// The global end Observable to end the press Observable and
	// remove the 'long-press' css class from the target.
	var end_somewhere = $(window).endAsObservable();
	
	var ends = Rx.Observable.merge([end, end_somewhere]);
	var selector = selectPressActivationTimer(activation_time, move, ends, distance);
	var press = down.selectMany(selector);
	
	return press
		.doAction(_.partial(target.removeClass, target, 'press'))
		.doAction(_.partial(target.addClass, target, 'long-press'))
		.finallyAction(_.partial(target.removeClass, target, 'press long-press'));
}

function selectPressActivationTimer(activation_time, move, end, distance) {
	
	return function(start) {
		
		// The number of timer events that need to
		// elapse before we decide the press has happened.
		var intervals = Math.round(activation_time / 25);
		var timer = Rx.Observable.interval(25);
		
		// Dispatches a move event when the pointing device
		// moves too far from the origin.
		var movedTooFar = move.where(function(move) {
			var total = move.total;
			
			return false === epsilon(
				distance.x, distance.y,
				total.x, total.y
			);
		});
		
		// The Observable that counts the number of timer intervals.
		// If the end or move Observables dispatch before the activation
		// time has been reached, this Observable terminates early.
		var held = press_timer
			// Terminate early if end on the target, end on the window,
			// or if the pointer moved too far from the origin.
			.takeUntil(end)
			.takeUntil(movedTooFar)
			// Take only as many as we need.
			.take(intervals)
			// Only care about the last value.
			.takeLast(1)
			// Only dispatch if the last value indicates the press_timer
			// Observable dispatched enough intervals to reach the activation_time.
			.where(function(i) { return i >= intervals - 1});
		
		return held
			// Select the original start event for future peoples.
			.select(function() { return start; })
			// Terminate the sequence when either of the end conditions are met.
			.takeUntil(end);
	}
}