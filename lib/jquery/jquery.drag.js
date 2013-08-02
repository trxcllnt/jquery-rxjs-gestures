var Rx = require('rx');
var _ = require('lodash');
var $ = require('jquery');

var end_somewhere  = require('../events/end_somewhere');
var move_somewhere = require('../events/move_somewhere');

function select_drags(start) {
	return move_somewhere.
		startWith(start).
		takeUntil(end_somewhere);
}

module.exports = function(activation_time, distance) {
	
	var target = this;
	var press = target.pressAsObservable(activation_time, distance);
	var drag = press.selectMany(select_drags);
	
	return drag;
}