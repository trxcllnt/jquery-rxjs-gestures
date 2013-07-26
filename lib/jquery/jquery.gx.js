var $ = require('jquery');

module.exports = function() {
	
	var target = $(this),
		ml = parseInt(target.css('margin-left')) || 0,
		ol = target.offset().left;
	
	return ol - ml;
}
