var plugins = require('gulp-load-plugins')();

module.exports = function (err) {
  plugins.util.beep();
  return console.log(err);
};