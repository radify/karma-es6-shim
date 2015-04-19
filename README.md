karma-es6-shim
==============

Karma wrapper that makes sure the ES6 and ES5 shims are BOTH available. See also the [example usage project](https://github.com/radify/karma-es6-shim-example).

Modified from https://github.com/pokehanai/karma-es5-shim

[es6-shim][] for [Karma][] including [es5-shim][]

[es6-shim]: https://github.com/paulmillr/es6-shim/
[es5-shim]: https://github.com/es5-shim/es5-shim/
[karma]:    http://karma-runner.github.io

Motivation
----------

Most versions of PhantomJS do not support ES5, let alone ES6. This meant that you got all sorts of errors when you tried to test ES6 features, even if you had used the [Babel (AKA 6to5 ) transpiler](https://babeljs.io/).

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
