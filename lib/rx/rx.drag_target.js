var Rx = require('rx');
var $ = require('jquery');
var _ = require('underscore');
var proxy = require('./drag_proxy_observable');

module.exports = function(target, classnames) {
	
	target = $(target);
	classnames = classnames || 'drag-proxy';
	
	return Rx.Observable.createWithDisposable(function(observer) {
		
		var tx = target.gx();
		var ty = target.gy();
		
		proxy_obs = proxy(target, tx, ty, classnames);
		
		return proxy_obs.subscribe(observer);
	});
}
