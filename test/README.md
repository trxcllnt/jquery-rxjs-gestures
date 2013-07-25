browserify-template
===================
`npm install` and you're good to go.  
`node build.js` to build dev  
`node build.js -env prod` to minify for production  
`node build.js --server` to start a local server that recompiles your sources on each refresh.  
`node build.js --server -env prod` to start a local server hosting minified code.  
Application modules
===================
Declare your app's modules in the `package.json` file as `name: src` key-value pairs. Later, instead of doing `require('../..i/hate/relative/paths/to/my_module')`, you can do `require('my_module')` instead.
Building
========
The `build.js` file arguments are `-env`, `-src`, `-lib`, `-out`, and `-server`. Default arguments are:
```
{
  env: 'dev',
  src: 'src/',
  lib: 'lib/',
  out: 'build.js',
  server: false
}
```
Development
===========
You can run `node build.js` with the `-server` arugment to start a local express server at `http://localhost:3000`. Refreshing recompiles your sources.
