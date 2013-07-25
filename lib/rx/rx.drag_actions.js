var Rx = require('rx');
var $ = require('jquery');
var _ = require('underscore');
var end_somewhere  = require('../events/end_somewhere');

module.exports = function(target, hide_original, classnames) {
	
	target = $(target);
	hide_original = hide_original === void(0) ? true : hide_original;
	classnames = classnames || 'drag-proxy';
	
	var original_props = {},
		coords,
		head,
		tail;
	
	var source = this.publish().refCount();
	head = source.take(1);
	tail = source.skip(1);
	
	return head
		.doAction(setup)
		.merge(tail)
		.takeUntil(end_somewhere)
		.doAction(follow, null, finish);
	
	function setup(move) {
		
		coords = {
			left: target.gx(),
			top: target.gy(),
		};
		
		original_props['position'] = target.css('position');
		original_props['z-index'] = target.css('z-index');
		
		target
			.addClass(classnames)
			.css({
				'position': 'absolute',
				'z-index': 2147483638 /*int.MAX_VALUE for 32-bit operations*/
			}).
			animate(coords, 0);
	}
	
	function follow(move) {
		var delta = move.delta;
		
		coords.left += delta.x;
		coords.top += delta.y;
		
		target.animate(coords, 0);
	}
	
	function finish() {
		target.
			removeClass(classnames).
			css(original_props);
	}
}
