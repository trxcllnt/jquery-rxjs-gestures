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
	var ends_somewhere = $(window).endAsObservable();
	
	var selector = selectPressActivationTimer(activation_time, move, ends_somewhere, distance);
	var press = down.selectMany(selector).takeUntil(ends_somewhere);
	
	return press
		.doAction(
			function() { target.removeClass('press').addClass('long-press'); },
			function(e) { console.error(e); },
			function() { target.removeClass('press long-press'); }
		)
		.repeat()
}

function selectPressActivationTimer(activation_time, move, end, distance) {
	
	return function(start) {
		
		var press_timer = Rx.Observable.timer(activation_time).take(1);
		
		// Dispatches a move event when the pointing device
		// moves too far from the origin.
		var movedTooFar = move.where(function(event) {
			var total = event.total;
			
			return true === epsilon(
				distance.x, distance.y,
				total.x, total.y
			);
		});
		
		// The Observable that counts the number of timer intervals.
		// If the end or move Observables dispatch before the activation
		// time has been reached, this Observable terminates early.
		return press_timer
			// Terminate early if end on the target, end on the window,
			// or if the pointer moved too far from the origin.
			.takeUntil(end)
			.takeUntil(movedTooFar)
			// Select the original start event for future peoples.
			.select(function() { return start; });
	}
}