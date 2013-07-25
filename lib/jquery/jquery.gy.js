var $ = require('jquery');

module.exports = function() {
	
	var target = $(this);
	
	var m = parseInt(target.css('margin-top'));
	var l = target.offset().top;
	
	return l - m;
}