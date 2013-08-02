var Rx = require('rx');
var _ = require('lodash');
var $ = require('jquery');

var supported = _.bind(require('../events/is_supported'), null, 'touchstart');
var normalize_mouse = require('../events/normalize_mouse_event');
var normalize_touch = require('../events/normalize_touch_event');
var cancel_event	= require('../events/cancel_event');
var end_somewhere = require('../events/end_somewhere');

module.exports = function() {
	
	var target = $(this);
	
	var touch = target
		.onAsObservable('touchstart')
		.select(normalize_touch(0));
	
	var mouse = target
		.onAsObservable('mousedown')
		.select(normalize_mouse)
		.doAction(cancel_event);
	
	return Rx.Observable
		.ifThen(supported, touch, mouse)
		.takeUntil(end_somewhere)
		.doAction(
			_.bind(target.addClass, target, 'press'),
			null,
			_.bind(target.removeClass, target, 'press')
		)
}
