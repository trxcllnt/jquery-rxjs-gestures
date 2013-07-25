var Rx = require('rx');
var _ = require('underscore');
var $ = require('jquery');

module.exports = function(activation_time, distance) {
	
	var target = this;
	
	var press = target.pressAsObservable(activation_time, distance);
	
	var move_somewhere = $(window).moveAsObservable();
	var end_somewhere = $(window).endAsObservable();
	
	var drag = press.selectMany(select_drags);
	
	return drag.takeUntil(end_somewhere).repeat();
	
	function select_drags(start) {
		return move_somewhere.takeUntil(end_somewhere);
	}
}