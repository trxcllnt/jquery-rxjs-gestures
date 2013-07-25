require('../index');
var $   = require('jquery');

module.exports = $(window)
	.endAsObservable()
	.publish()
	.refCount();