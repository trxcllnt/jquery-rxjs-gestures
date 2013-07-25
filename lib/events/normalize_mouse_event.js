module.exports = function(event) {
	return {
		event: event,
		original: event.originalEvent,
		global: {
			x: event.pageX,
			y: event.pageY
		},
		local: {
			x: event.clientX,
			y: event.clientY
		},
		delta: { x: 0, y: 0},
		total: { x: 0, y: 0},
		index: 0,
		touches: 1
	}
}