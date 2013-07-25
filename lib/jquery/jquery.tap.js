var Rx = require('rx');
var _ = require('underscore');
var $ = require('jquery');
var epsilon = require('../geom/epsilon');

module.exports = function(end_time, distance) {
	
	if(end_time === undefined) end_time = 250;
	if(distance === undefined) distance = { x: 10, y: 10 }
	
	var target = $(this);
	var down = target.downAsObservable();
	var end = target.endAsObservable();
	var tap = down.selectMany(selectUpTimeout(distance));
	
	return tap;
}

function selectUpTimeout(distance) {
	
	return function(start) {
		
		var ended_within_radius = end.where(function(end) {
			return false === epsilon(
				distance.x, distance.y,
				end.x - start.x,
				end.y - start.y
			);
		});
		
		var timeout_contingency = Rx.Observable.empty()
			.finallyAction(removeClass(target, 'press'));
		
		var ended_within_time = ended_within_radius
			.select(function(){ return start; })
			.timeout(end_time)
			.catchException(timeout_contingency);
		
		return ended_within_time;
	}
}
