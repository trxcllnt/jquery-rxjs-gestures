// Make sure we have all the dependencies.
try {
	var compile = require('./compile');
	var argv    = require('optimist')
                    .default({
                        'env': 'dev',
                        'src': 'src/',
                        'lib': 'lib/',
                        'out': 'bundle.js'
                    })
                    .argv;
	var express = require('express');
	var rxfs    = require('./node_modules/rx-node-utils/lib/rx-fs');
} catch(error) {
	console.error(error, 'Please run `npm install` first');
	process.exit(1);
}

var debug        = argv.env === 'dev';
var package_path = './package.json';
var src_path     = './' + argv.src;
var lib_path     = './' + argv.lib;
var out_path     = argv.out;

// Start the server
express()
	// route requests to /lib/ to serve files from the /lib/ dir
	.use('/' + argv.lib, express.static(__dirname + '/' + argv.lib))
	// route everything else to recompile source and serve up index.html
	.use(function(req, res) {
		compile(debug, package_path, src_path, lib_path, out_path)
			.subscribe(
				function(file) {
					rxfs.readFile('index.html').subscribe(function(x) {
						console.log('sending', x.path);
						res.send(x.file);
					})
				},
				function(err){
					res.send(err.toString());
				});
	})
	.listen(3000);

