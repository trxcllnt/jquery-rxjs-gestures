module.exports = function(value) {
	value = value.toString();
	var pattern = /([0-9-]+)+(?![3d]\()/gi,
		positionMatched = value.match(pattern) || [];
		
		return {
			x: parseFloat(positionMatched[0]) || 0,
			y: parseFloat(positionMatched[1]) || 0,
			z: parseFloat(positionMatched[2]) || 0
		};
};