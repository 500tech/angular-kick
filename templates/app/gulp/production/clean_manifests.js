var del = require('del');
var plugins = require('gulp-load-plugins')();

module.exports = function (done) {
  var destination = plugins.util.env.DESTINATION;

  return del(destination + '/manifests', done);
};