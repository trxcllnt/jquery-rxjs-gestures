var Rx = require('rx');
var _ = require('lodash');
var $ = require('jquery');

var supported = _.bind(require('../events/is_supported'), null, 'touchmove');
var normalize_mouse = require('../events/normalize_mouse_event');
var normalize_touch = require('../events/normalize_touch_event');
var scan_deltas = require('../events/scan_deltas');

module.exports = function() {
	
	var target = $(this);
	
	var touch = target
		.bindAsObservable('touchmove')
		.select(normalize_touch(0));
	
	var mouse = target
		.bindAsObservable('mousemove')
		.select(normalize_mouse);
	
	return Rx.Observable
		.ifThen(supported, touch, mouse)
		.scan(scan_deltas);
}
