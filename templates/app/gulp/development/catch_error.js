var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var common = require('../common');

module.exports = function (err) {
  var sources = common.sources;
  var destination = plugins.util.env.DESTINATION;

  plugins.util.beep();
  console.log(err);
  plugins.util.env.GULP_ERROR_RAISED = true;

  return gulp.src(sources.index)
    .pipe(plugins.inject(gulp.src(sources.error), {
      starttag: '<body>',
      endtag: '</body>',
      transform: function (filename, file) {
        if (err.plugin) {
          return file.contents.toString('utf8')
            .replace('%%MESSAGE%%', err.message)
            .replace('%%FILENAME%%', err.fileName)
            .replace('%%PLUGIN%%', err.plugin);
        } else {
          return file.contents.toString('utf8')
            .replace('%%MESSAGE%%', err.message + ' (line: ' + err.line + ' column: ' + err.column + ')')
            .replace('%%FILENAME%%', err.file)
            .replace('%%PLUGIN%%', 'gulp-sass');
        }
      }
    }))
    .pipe(gulp.dest(destination));
};