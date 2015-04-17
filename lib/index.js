var createPattern = function(path) {
  return {pattern: path, included: true, served: true, watched: false};
};

var initShim = function(files) {
  files.unshift(createPattern(__dirname + '/../vendor/es6-sham.min.js'));
  files.unshift(createPattern(__dirname + '/../vendor/es6-shim.min.js'));
};

initShim.$inject = ['config.files'];

module.exports = {
  'framework:es6-shim': ['factory', initShim]
};

