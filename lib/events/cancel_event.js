module.exports = function(normalizedOrEvent) {
	
	var event = 'event' in normalizedOrEvent ?
		normalizedOrEvent.event :
		normalizedOrEvent;
	
	event.stopPropagation();
	event.preventDefault();
	
	return normalizedOrEvent;
}