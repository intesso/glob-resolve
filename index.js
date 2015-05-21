/*
 * module dependencies
 */
var glob = require('glob-var');

/*
 * api functions
 */

exports.async = function(srcPattern, destPattern, options, cb) {
  // get arguments right
  if (typeof options === 'function') cb = options, options = {};
  if (!options) options = {};
  cb = cb || noop;

  // extract src vars
  glob(srcPattern, options, function(err, src) {
    if (err) return cb(err);
    // resolve and transform into dest vars
    var result = _resolve(src, destPattern);
    cb(null, result);
  });

};

exports = module.exports = exports.async;

exports.sync = function(srcPattern, destPattern, options) {
  // extract src vars
  var src = glob.sync(srcPattern, options);

  // resolve and transform into dest vars
  return _resolve(src, destPattern);
};

exports.globvar = glob;


/*
 * helper functions
 */

function noop() {
}

function _resolve(src, pattern) {
  // dest vars
  var dest = glob.extractVars(pattern);

  // map variables -> dest.paths
  dest.values = [];
  dest.paths = src.values.map(function(values, i) {
    dest.values.push(values);
    return glob.insertValues(pattern, values);
  });

  return {
    src: src,
    dest: dest
  }
}
