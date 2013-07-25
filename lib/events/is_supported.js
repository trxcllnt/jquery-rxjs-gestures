var TAGNAMES = {
	'select': 'input',
	'change': 'input',
	'submit': 'form',
	'reset' : 'form',
	'error' : 'img',
	'load'  : 'img',
	'abort' : 'img'
};

module.exports = function(name) {
	
	var element = document.createElement(TAGNAMES[name] || 'div');
	
	name = "on" + name;

	var supported = name in element;
	
	if(supported === true) return supported;

	// if it has no 'setAttribute' (i.e. doesn't implement Node interface), try generic element
	if(!element.setAttribute) {
		element = document.createElement('div')
	}
	
	if(!element.setAttribute || !element.removeAttribute) return false;

	element.setAttribute(name, '');
	supported = typeof element[name] == 'function';
	
	if(element[name]) element[name] = undefined
	element.removeAttribute(name);

	return supported;
}
