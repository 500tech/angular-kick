var builder = require('systemjs-builder');

module.exports = function (cb) {
  builder = new builder();
  builder.reset();
  builder.loadConfig('./config.js').then(function () {
    builder.config({
      baseURL: 'public/'
    });
    builder.build('app', 'public/app.js', { minify: true }).then(function () {
      return cb();
    });
  });
};