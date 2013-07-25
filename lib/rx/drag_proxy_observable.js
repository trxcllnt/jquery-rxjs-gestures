function translate(x, y) {
	return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
}

module.exports = function(target, tx, ty, classnames) {
	
		var props = {
			position: 'absolute',
			top: 0, left: 0,
			width: '' + target.width() + 'px',
			height: ''+ target.height() + 'px'
		};
		
		target
			.removeClass('press long-press')
			.css(props);
		
		props.width = target.outerWidth(true);
		props.height = target.outerHeight(true);
		props.transform = translate(tx, ty);
		
		var proxy = $('<div></div>')
			.addClass(classnames)
			.css(props)
			.append(target)
			.appendTo('body');
		
		return source
			.doAction(function(move) {
				
				var delta = move.delta;
				
				tx += delta.x;
				ty += delta.y;
				
				proxy.css('transform', translate(tx, ty));
				
				move.proxy = proxy;
			})
			.finallyAction(onCompleted);
		
		function onCompleted() {
			
			proxy.empty().remove();
			
			target.removeClass('press long-press')
		}
}