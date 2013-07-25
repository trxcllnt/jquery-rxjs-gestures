var compile = require('./compile')

compile(true, './test/package.json', './test/src/', './test/lib/', 'bundle.js').
	subscribe(function(file) {
		console.log('ok');
	});