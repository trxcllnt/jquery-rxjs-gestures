module.exports = function(b, a){
	
	if(!a) return b;
	if(!b) return a;
	
	var delta = {
		x: a.global.x - b.global.x,
		y: a.global.y - b.global.y
	}
	
	var total = {
		x: delta.x + b.total.x,
		y: delta.y + b.total.y
	}
	
	a.delta = delta;
	a.total = total;
	a.previous = b;
	
	return a;
}
