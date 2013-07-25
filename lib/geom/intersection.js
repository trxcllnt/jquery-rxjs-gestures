module.exports = function(a, b) {
	
	var x_overlap = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left))
	var y_overlap = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top))
	
	return x_overlap * y_overlap
}
