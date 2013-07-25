module.exports = function() {
	
	var ui = $('<div></div>').css({
		width: 150 + 'px',
		height: 75 + 'px',
		'background': 'orange'
	})
	.text('Press')
	
	var press = ui.pressAsObservable().repeat();
	
	press.subscribe(function(event) {
		
		var local = event.local;
		var global = event.global;
		
		var str = 'Press at <br>';
		str += 'local: (' + local.x + ', ' + local.y + ')<br>';
		str += 'global: (' + global.x + ', ' + global.y + ')';
		
		ui.html(str);
	});
	
	return ui;
}