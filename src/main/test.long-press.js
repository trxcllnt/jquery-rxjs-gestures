module.exports = function() {
	
	var ui = $('<div></div>').css({
		width: 150 + 'px',
		height: 150 + 'px',
		'background': 'pink'
	})
	.text('Long Press (>= 500ms)')
	
	var press = ui.pressAsObservable(500);
	
	press.subscribe(function(event) {
		
		var local = event.local;
		var global = event.global;
		
		var str = 'Long Press (>= 500ms) at <br>';
		str += 'local: (' + local.x + ', ' + local.y + ')<br>';
		str += 'global: (' + global.x + ', ' + global.y + ')';
		
		ui.html(str);
	});
	
	return ui;
}