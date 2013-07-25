require('jquery-plugins');
require('./index.css');

var down = require('./test.down');
var move = require('./test.move');
var end = require('./test.end');
var press = require('./test.press');
var long_press = require('./test.long-press');
var tap = require('./test.tap');
var drag = require('./test.drag');
var long_drag = require('./test.long-drag');
var drag_target = require('./test.drag-target');

module.exports = function() {
	var ui = $('body');
	
	ui.append(
		down(),
		move(),
		end(),
		press(),
		long_press(),
		tap(),
		drag(),
		long_drag(),
		drag_target()
	);
	
	return ui;
}