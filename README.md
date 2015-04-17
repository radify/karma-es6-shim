karma-es6-shim
==============

Karma wrapper that makes sure the ES6 and ES5 shims are BOTH available.

Modified from https://github.com/pokehanai/karma-es5-shim

[es6-shim][] for [Karma][] including [es5-shim][]

[es6-shim]: https://github.com/paulmillr/es6-shim/
[es5-shim]: https://github.com/es5-shim/es5-shim/
[karma]:    http://karma-runner.github.io

Motivation
----------

Most versions of PhantomJS do not support ES5, let alone ES6. This meant that you got all sorts of errors when you tried to test ES6 features, even if you had used the [Babel (AKA 6to5 ) transpiler](https://babeljs.io/).

Therefore, we have modified https://github.com/pokehanai/karma-es5-shim :

* Use peerDependencies rather than submodules
* Include both ES5 and ES6

Links
-----

[Karma Runner Project]: https://github.com/karma-runner/karma
[karma-requirejs plugin]: http://karma-runner.github.io/0.8/plus/RequireJS.html
[karma-phantomjs-launcher]: -https://github.com/karma-runner/karma-phantomjs-launcher

Installation
------------

Install the module from npm:

```sh
npm install karma-es6-shim --save
```

Add `es6-shim` to the `frameworks` key after `requirejs` in your Karma configuration:

```js
module.exports = function(karma) {
  karma.set({
    // frameworks to use
    frameworks: ['requirejs', 'es6-shim']
    // ...
  });
};
```

Requirements
------------

You will almost certainly need some kind of transpiler such as [Babel (AKA 6to5 )](https://babeljs.io/). Here is a Gulp example:

Example usage
-------------

It's all in the config.

### package.json

package.json tells npm what dependencies you have. Here's an example that loads `karma-es6-shim`:

```json
{
  "name": "My app",
  "dependencies": {
    "gulp": "^3.8.10",
    "gulp-6to5": "^1.0.2",
    "gulp-connect": "^2.2.0",
    "gulp-jasmine": "^1.0.1",
    "gulp-less": "^2.0.1",
    "gulp-uglify": "^1.0.2",
    "karma": "~0.12.31",
    "gulp-karma": "0.0.4",
    "karma-phantomjs-launcher": "~0.1.4",
    "karma-requirejs": "~0.2.2",
    "jasmine-core": "~2.2.0",
    "karma-jasmine": "~0.3.5",
    "es6-shim": "~0.28.1",
    "karma-es6-shim": "^0.1.0"
  }
}
````


### Gulp

Gulp is similar to Grunt, it allows you to write build scripts etc. Here is a snippet of how we build and test:

```javascript
var paths = {
  src:      ['src/**.js', 'src/*/**.js'],
  dest:     'build/js',
  specSrc:  'spec/*Spec.js',
  specDest: 'build/spec',
  spec:     'build/spec/*Spec.js',
  less:     'less/*.less',
  css:      'build/css'
};

// build task that builds your transpiled files
function build(src, dst, min) {
  var pipe = gulp.src(src).pipe(to5({ modules: "amd" })), dest = gulp.dest(dst);
  return min ? pipe.pipe(ug()).pipe(dest) : pipe.pipe(dest);
}

// tsk to build our tests
gulp.task('build-test', function() {
  return build(paths.specSrc, paths.specDest);
});

// test task to run Karma
gulp.task('test', function() {
  return gulp.src(['./non-exist.js']) // I found that giving it a nonexistent file causes it to use karma.conf.js's file list
    .pipe(karma({
       configFile: 'spec/karma.conf.js',
       action: 'run'
    }));
});
```

### karma.conf.js example

karma.conf.js is the configuration file for Karma. In this example, we tell it to use the shim in the "frameworks" section:

```javascript
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs', 'es6-shim'],


    // list of files / patterns to load in the browser
    files: [
      'spec/test-main.js',
      {pattern: 'build/js/**/*.js', included: false},
      {pattern: 'build/spec/**/*Spec.js', included: false}
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};

```

### Running it

Write some tests in directory `/spec` then run:

```bash
gulp build-test && gulp test
```

Your mileage may vary but this example worked for us.
