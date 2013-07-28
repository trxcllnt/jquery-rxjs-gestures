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
		source = this;
	
	return Rx.Observable.createWithDisposable(function(observer) {
		
		var first = true;
		
		return source.subscribe(
			function(move) {
				first ? setup(move) : follow(move);
				first = false;
				
				observer.onNext(move);
			},
			function(e) { observer.onError(e); },
			function() {
				cleanup();
				observer.onCompleted()
			}
		);
	});
	
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
	
	function cleanup() {
		target.removeClass(classnames);
	}
}
