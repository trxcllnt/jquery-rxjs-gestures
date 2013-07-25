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
		
		var props = {
			position: 'absolute',
			top: 0, left: 0,
			width: '' + target.width() + 'px',
			height: ''+ target.height() + 'px'
		};
		
		var clone = target
			.clone()
			.addClass('drag-clone')
			.css(props);
		
		target.css('visibility', 'hidden');
		
		proxy_obs = proxy(clone, tx, ty, classnames);
		
		return proxy_obs.subscribe(
			_.bind(observer.onNext, observer),
			_.bind(observer.onError, observer.onError),
			onCompleted
		);
		
		function onCompleted() {
			target.css('visibility', 'visible');
			observer.onCompleted();
		}
	});
}
