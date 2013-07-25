var $ = require('jquery');

module.exports = function() {
	
	var target = $(this);
	
	var m = parseInt(target.css('margin-left')) || 0;
	var l = target.offset().left;
	
	return l - m;
}
