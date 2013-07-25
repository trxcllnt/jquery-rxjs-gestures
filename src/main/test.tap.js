module.exports = function() {
	
	var ui = $('<div></div>').css({
		width: 150 + 'px',
		height: 150 + 'px',
		'background': 'lightblue'
	})
	.text('Tap (<= 250ms)')
	
	var press = ui.tapAsObservable(250).repeat();
	
	press.subscribe(function(event) {
		
		var local = event.local;
		var global = event.global;
		
		var str = 'Tap (<= 250ms) at <br>';
		str += 'local: (' + local.x + ', ' + local.y + ')<br>';
		str += 'global: (' + global.x + ', ' + global.y + ')';
		
		ui.html(str);
	});
	
	return ui;
}