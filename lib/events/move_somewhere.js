require('../index');
var $   = require('jquery');

module.exports = $(window)
	.moveAsObservable()
	.publish()
	.refCount();