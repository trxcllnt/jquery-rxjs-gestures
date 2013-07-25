var $ = require('jquery');

module.exports = function() {
	
	target = $(this);
	
	var x = target.gx();
	var y = target.gy();
	var w = target.outerWidth(true);
	var h = target.outerHeight(true);
	
	return {
		left: x, right: x + w,
		top: y, bottom: y + h,
		x: x, y: y, w: w, h: h
	};
}