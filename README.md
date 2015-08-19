karma-es6-shim
==============
[![npm version](https://badge.fury.io/js/karma-es6-shim.svg)](https://www.npmjs.com/package/karma-es6-shim)
[![Dependency Status](https://david-dm.org/radify/karma-es6-shim.svg)](https://david-dm.org/radify/karma-es6-shim)

Karma wrapper that makes sure the ES6 and ES5 shims are BOTH available. See also the [example usage project](https://github.com/radify/karma-es6-shim-example).

Modified from https://github.com/pokehanai/karma-es5-shim

[es6-shim](https://github.com/paulmillr/es6-shim/) for [karma](http://karma-runner.github.io) including [es5-shim](https://github.com/es5-shim/es5-shim/).

Motivation
----------

Most versions of PhantomJS do not support ES5, let alone ES6. This meant that you got all sorts of errors when you tried to test ES6 features, even if you had used the [Babel/6to5 transpiler](https://babeljs.io/).

Therefore, we have modified [pokehanai/karma-es5-shim](https://github.com/pokehanai/karma-es5-shim) in the following ways:

* Use peerDependencies rather than submodules
* Include both ES5 and ES6 so that PhantomJS can run tests

Links
-----

* [Karma Runner Project]: https://github.com/karma-runner/karma
* [karma-requirejs plugin]: http://karma-runner.github.io/0.8/plus/RequireJS.html
* [karma-phantomjs-launcher]: https://github.com/karma-runner/karma-phantomjs-launcher
* [Example usage](https://github.com/radify/karma-es6-shim-example)

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

Example usage
-------------

You will almost certainly need some kind of transpiler such as [Babel or 6to5](https://babeljs.io/).

We have supplied an example repository at [https://github.com/radify/karma-es6-shim-example](github.com/radify/karma-es6-shim-example).

When to use this and when not to
--------------------------------

Use it if you meet all the following criteria:

* You are using PhantomJS in Karma to test ES6
* You use the es6-shim polyfill in your HTML
* You need to use AMD-based module loading, e.g. RequireJS (see [Babel's docs](https://babeljs.io/docs/usage/runtime/) for more information)

Do not use it if:

* You can [work around it using Babel's transform](https://github.com/babel/babel/issues/377)
* You are polyfilling in some other way that is accessible to PhantomJS in Karma
