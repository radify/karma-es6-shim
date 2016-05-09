var path = require('path');

var createPattern = function(path) {
  return {pattern: path, included: true, served: true, watched: false};
};

var initShim = function(files) {

  var path6 = path.dirname(require.resolve('es6-shim'));
  var path5 = path.dirname(require.resolve('es5-shim'));

  files.unshift(createPattern(path6 + '/es6-sham.min.js'));
  files.unshift(createPattern(path6 + '/es6-shim.min.js'));
  files.unshift(createPattern(path5 + '/es5-sham.min.js'));
  files.unshift(createPattern(path5 + '/es5-shim.min.js'));

};

initShim.$inject = ['config.files'];

module.exports = {
  'framework:es6-shim': ['factory', initShim]
};
