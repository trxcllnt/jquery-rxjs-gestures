module.exports = function(event) {
	return {
		event: event,
		global: {
			x: e.pageX,
			y: e.pageY
		},
		local: {
			x: e.clientX,
			y: e.clientY
		},
		delta: { x: 0, y: 0},
		total: { x: 0, y: 0},
		index: 0,
		touches: 1
	}
}