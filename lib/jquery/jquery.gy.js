var $ = require('jquery');

module.exports = function() {
	
	var target = $(this),
		mt = parseInt(target.css('margin-top')) || 0,
		ot = target.offset().top;
	
	return ot - mt;
}