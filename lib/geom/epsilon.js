module.exports = function(w, h, dx, dy) {
	return (w * h) < (dx * dx) + (dy * dy);
}
