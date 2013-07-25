var Rx = require('rx');
var _ = require('underscore');
var $ = require('jquery');

var supported = _.bind(require('../events/is_supported'), null, 'touchend');
var normalize_mouse = require('../events/normalize_mouse_event');
var normalize_touch = require('../events/normalize_touch_event');

module.exports = function() {
	var target = $(this);
	
	var touch = target
		.onAsObservable('touchend')
		.select(normalize_touch(0));
	
	var mouse = target
		.onAsObservable('mouseup')
		.select(normalize_mouse);
	
	return Rx.Observable.ifThen(supported, touch, mouse);
}