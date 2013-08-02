module.exports = function() {
	
	var ui = $('<div></div>').css({
		width: 150 + 'px',
		height: 150 + 'px',
		'background': 'green'
	})
	.text('Down')
	
	var down = ui.downAsObservable().repeat();
	
	down.subscribe(function(event) {
		var local = event.local;
		var global = event.global;
		
		var str = 'Down at <br>';
		str += 'local: (' + local.x + ', ' + local.y + ')<br>';
		str += 'global: (' + global.x + ', ' + global.y + ')';
		
		ui.html(str);
	});
	
	return ui;
}