module.exports = function() {
	
	var ui = $('<div></div>').css({
		width: 150 + 'px',
		height: 75 + 'px',
		'background': 'blue'
	})
	.text('Move')
	
	var move = ui.moveAsObservable();
	
	move.subscribe(function(event) {
		
		var local = event.local;
		var global = event.global;
		
		var str = 'Move at <br>';
		str += 'local: (' + local.x + ', ' + local.y + ')<br>';
		str += 'global: (' + global.x + ', ' + global.y + ')';
		
		ui.html(str);
	});
	
	return ui;
}