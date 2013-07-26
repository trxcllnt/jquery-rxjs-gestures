var Rx = require('rx');
var $ = require('jquery');
var _ = require('underscore');
var end_somewhere  = require('../events/end_somewhere');
var translate = require('css3-translate')

module.exports = function(target, hide_original, classnames) {
	
	target = $(target);
	hide_original = hide_original === void(0) ? true : hide_original;
	classnames = classnames || 'drag-proxy';
	
	var x = 0, y = 0,
		source = this.publish().refCount();
		head = source.take(1),
		tail = source.skip(1);
	
	return head
		.doAction(setup)
		.merge(tail)
		.takeUntil(end_somewhere)
		.doAction(
			follow, null,
			_.bind(target.removeClass, target, classnames)
		);
	
	function setup(move) {
		
		x = target.gx();
		y = target.gy();
		
		translate.d3(target[0], x, y, 0);
		target.addClass(classnames);
	}
	
	function follow(move) {
		var delta = move.delta;
		
		x += delta.x;
		y += delta.y;
		
		translate.d3(target[0], x, y, 0);
	}
}
