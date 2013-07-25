// Make sure we have all the dependencies.
try {
	var browserify = require('browserify');
	var hamlify    = require('hamlify');
	var sassify    = require('sassify2');
	var uglify     = require('uglify-js');
	
	var rxfs       = require('./node_modules/rx-node-utils/lib/rx-fs');
	
	var Rx         = require('rx');
	var Ix         = require('ix');
	var _          = require('underscore');
} catch(error) {
	console.error(error, 'Please run `npm install` first');
	process.exit(1);
}

// Builds everything.
module.exports = function(debug, package_path, src_path, lib_path, out_path) {
	
	var html = write_index_html(lib_path, out_path);
	var js   = nuke_compile_minify_write_js(debug, package_path, src_path, lib_path, out_path);
	
	return html.concat(js).lastOrDefault();
}

function nuke_compile_minify_write_js(debug, package, src, lib, out) {
	
	// Nuke the destination folder of its existing contents.
	nuke           = nuke_lib(lib);
	
	// Read in the app_modules from the package.json
	packager       = get_packager(package, src);
	
	// Package only after the desination folder has been nuked.
	// Take the browserify packager emitted as the last value.
	nukeThenPackage = nuke.concat(packager).last();
	
	// Bundle the browserify package
	bundled         = nukeThenPackage.selectMany(bundle_packages(debug));
	
	// If we're in prod, minify the source with uglify
	minified        = Rx.Observable.ifThen(
		function(){ return debug; },
		bundled,
		bundled.selectMany(uglify_source)
	);
	
	// Write the generated file to the destination folder
	output          = minified.writeFiles(function() {
		return lib + out;
	});
	
	return output;
}

// Nukes the destination of all descendents content, emitting the last value deleted.
function nuke_lib(dest) {
	return rxfs.nukedir(dest).lastOrDefault();
}

// Read the browserify packager, select it into JSON,
// then select the JSON into an list of application modules.
function get_packager(pckg, src) {
	
	var packager = browserify()
		.transform(hamlify)
		.transform(sassify)
		.add(src);
	
	return rxfs
		.readFile(pckg)
		.select(function(x) {
			return JSON.parse(x.file);
		})
		.selectMany(select_package_modules)
		.aggregate(packager, aggregate_required_modules);
}

// Pulls the modules from the package JSON, throws an error if there's in the syntax of a module.
function select_package_modules(package) {
	
	var modules = package.app_modules;
	
	if(typeof modules === 'object' ) {
		return Rx.Observable.fromArray(_.pairs(modules));
	}
	
	throw 'Name your modules, son.';
}

function aggregate_required_modules(packager, pair) {
	
	var name	= pair[0];
	var module	= pair[1];
	
	return packager.require(module, {expose: name});
}

function bundle_packages(debug) {
	
	return function(packager) {
		
		return Rx.Observable.create(function(observer) {
		
			packager.bundle({debug: debug}, function(err, src) {
				
				if(err !== null) return observer.onError(err);
				
				observer.onNext(src);
				observer.onCompleted();
			});
		});
	}
}

function uglify_source(src) {
	// TODO: I'll get to you later...
	return Rx.Observable.returnValue(src);
}

function write_index_html(lib, out) {
	var index = '<!DOCTYPE html>\n\
<html>\n\
	<head>\n\
		<title></title>\n\
	</head>\n\
	<body>\n\
		<script type="text/javascript" src="' + lib + out + '"></script>\n\
	</body>\n\
</html>';
	
	return rxfs.writeFile('index.html', index);
}
