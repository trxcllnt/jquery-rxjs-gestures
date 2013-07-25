module.exports = function(touch_index) {
	
	if(touch_index === undefined) touch_index = 0;
	
	return function(event) {
		
		var original = event.originalEvent;
		
		var touches = original.touches;
		var changedTouches = original.changedTouches;
		if(touches.length == 0) touches = changedTouches;
		
		touch = touches[touch_index] || { screenX: 0, screenY: 0, clientX: 0, clientY: 0 };
		
		return  {
			event: event,
			original: original,
			global: {
				x: touch.screenX,
				y: touch.screenY
			},
			local: {
				x: touch.clientX,
				y: touch.clientY
			},
			delta: { x: 0, y: 0},
			total: { x: 0, y: 0},
			index: touch_index,
			touches: touches.length
		}
	}
}