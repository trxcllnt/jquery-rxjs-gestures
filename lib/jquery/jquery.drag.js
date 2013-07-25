var Rx = require('rx');
var _ = require('underscore');
var $ = require('jquery');

module.exports = function(activation_time, distance) {
	
	var target = this;
	
	var press = target.pressAsObservable(activation_time, distance);
	var move = target.moveAsObservable();
	
	var end = target.endAsObservable();
	var end_somewhere = $(window).endAsObservable();
	
	var ends = Rx.Observable.merge([end, end_somewhere]);
	
	var drag = press.selectMany(select_drags);
	
	return drag.takeUntil(ends);
	
	function select_drags(start) {
		return move.takeUntil(ends);
	}
}