module.exports = function() {
	
	var ui = $('<div></div>').css({
		width: 150 + 'px',
		height: 150 + 'px',
		'background': 'lightgreen'
	})
	.text('Drag')
	
	var move = ui.dragAsObservable().repeat();
	
	move.subscribe(function(event) {
		
		var local = event.local;
		var global = event.global;
		
		var str = 'Drag at <br>';
		str += 'local: (' + local.x + ', ' + local.y + ')<br>';
		str += 'global: (' + global.x + ', ' + global.y + ')';
		
		ui.html(str);
	});
	
	return ui;
}