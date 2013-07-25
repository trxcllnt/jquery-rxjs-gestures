var Rx = require('rx');
var _ = require('underscore');

var intersection = require('../geom/intersection');
var drags = require('./drag_events');
var drops = require('./drop_targets');

module.exports = function(target, type, data) {
	
	var drag_source = this
		.doAction(onNext, onError, onCompleted)
		.publish()
		.refCount();
	
	var last_drag = dragSource.lastOrDefault();
	var drag_subscription = last_drag.subscribe(onLast)
	var global_subscription = drag_source.subscribe(drags);
	
	return drag_source;
		
	function onNext(move) {
		move.type = type;
		move.data = data;
	}
	
	function onError(err) {
		observer.onError(err);
	}
	
	function onCompleted() {
		drag_subscription.dispose()
		global_subscription.dispose();
	}
	
	function onLast(normalized) {
		
		var targets = _.map(drops, _.bind(_.first, _));
		var global = normalized.global;
		var x = global.x;
		var y = global.y;
		var r = target.grect();
		
		// Just in case the target's cloned/proxied, adjust
		// the rect coords based on the last drag event.
		r.x = r.left = x;
		r.y = r.top  = y;
		r.right  = x + r.w;
		r.bottom = y + r.h;
		
		// Try to get the rectangle under the x/y coords first.
		var index = getTargetAtPoint(x, y, targets);
		
		// If there's nothing immediately under the point, try
		// getting the drop target that intersects the most with
		// the dragged source rect.
		index = index >= 0 ?
			index :
			getBestTargetAtRect(r, targets);
		
		// Return if no drop targets were found.
		if(index == -1) return;
		
		// Remove the found drop target from the list.
		var pair = drops.splice(index, 1)[0];
		var subj = _.last(pair);
		
		// Complete the Subject. If an element accepts more than
		// one drop, they can resubscribe with IObservable.retry()!
		subj.onNext(normalized);
		subj.onCompleted();
	}
}

function getBestTargetAtRect(rect, targets) {
	
	if(targets.length == 0) return -1;
	
	var intersections = _.map(targets, function(target) {
		return intersection(rect, target.grect());
	});
	var best = _.max(intersections);
	
	if(isNaN(area)) return -1;
	if(area == 0) return -1;
	
	return _.indexOf(areas, area);
}

function getTargetAtPoint(x, y, targets) {
	var inflation = 20 * 0.5; //the area of the pointing device
	var area = {
			left: x - inflation,
			top: y - inflation,
			right: x + inflation,
			bottom: y + inflation,
			x: x - inflation,
			y: y - inflation,
			w: inflation * 2,
			h: inflation * 2
		};
		
	return getBestTargetAtRect(area, targets);
}