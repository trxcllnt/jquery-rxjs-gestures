// Make sure we have all the dependencies.
try {
	var argv       = require('optimist')
                       .default({
                           'env': 'dev',
                           'src': 'src/',
                           'lib': 'lib/',
                           'out': 'bundle.js'
                       })
                       .argv;
	var browserify = require('browserify');
	var express    = require('express');
	var hamlify    = require('hamlify');
	var sassify    = require('sassify2');
	var uglify     = require('uglify-js');
	
	var compile    = require('./compile');
	var rxfs       = require('./node_modules/rx-node-utils/lib/rx-fs');
	
	var Rx         = require('rx');
	var Ix         = require('ix');
	var            = require('underscore');
	
} catch(error) {
	console.error(error, 'Please run `npm install` first');
	process.exit(1);
}

var debug          = argv.env === 'dev';
var package_path   = './package.json';
var src_path       = './' + argv.src;
var lib_path       = './' + argv.lib;
var out_path       = argv.out;

compile(debug, package_path, src_path, lib_path, out_path)
	.subscribe(function(file) {
		console.log('built', file.path);
	},
	function(err) {
		console.error(err);
	},
	function() {
		console.error('done')
	});
