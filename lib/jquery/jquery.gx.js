var $ = require('jquery');

module.exports = function() {
	
	var target = $(this);
	
	var m = parseInt(target.css('margin-left'));
	var l = target.offset().left;
	
	return l - m;
}