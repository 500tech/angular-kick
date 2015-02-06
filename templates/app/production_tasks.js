"use strict";

var gulp            = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins         = gulpLoadPlugins();
var fs              = require('fs-extra');
var setENV          = JSON.parse(fs.readFileSync(__dirname + '/environments.json', "utf8"));

var sources = {
  app:          'app',
  dependencies: 'dependencies.js',
  appScript:    'app/app.js',
  scripts:      'app/**/*.js',
  styles:       'app/assets/stylesheets/**/*.scss',
  mainStyle:    'app/assets/stylesheets/application.scss',
  images:       'app/assets/images/**',
  fonts:        'app/assets/fonts/**',
  views:        ['app/**/*.html', '!app/app.html'],
  index:        'app/app.html'
};

var ENV = setENV['production'];
var destination = 'public';

var catchError = function (err) {
  plugins.util.beep();
  return console.log(err);
};

module.exports = {
  setEnvironment: function () {
    var environment = process.argv[3].replace(/^--/, '');
    if (setENV[environment]) {
      console.log('Setting ENV to ' + environment);
      ENV = setENV[environment];
    } else {
      throw 'Environment "' + environment + '" was not found in environments.js file';
    }
  },

  fonts: function () {
    return gulp.src(sources.fonts, { base: sources.app })
      .pipe(plugins.plumber({ errorHandler: catchError }))
      .pipe(gulp.dest(destination));
  },

  styles: function () {
    return gulp.src(sources.mainStyle, { base: sources.app })
      .pipe(plugins.plumber({ errorHandler: catchError }))
      .pipe(plugins.sass())
      .pipe(plugins.autoprefixer({ browsers: ['last 2 versions'] }))
      .pipe(plugins.cssmin())
      .pipe(plugins.rev())
      .pipe(gulp.dest(destination))
      .pipe(plugins.rev.manifest({ path: 'manifests/styles.json' }))
      .pipe(gulp.dest(destination));
  },

  index: function () {
    var manifest          = JSON.parse(fs.readFileSync(destination + '/manifests/scripts.json', "utf8"));
    var configManifest    = JSON.parse(fs.readFileSync(destination + '/manifests/config.json', "utf8"));
    var templateManifest  = JSON.parse(fs.readFileSync(destination + '/manifests/templates.json', "utf8"));
    var styleManifest   = JSON.parse(fs.readFileSync(destination + '/manifests/styles.json', "utf8"));
    var applicationSCSS = styleManifest[Object.keys(styleManifest)[0]].match(/application-.*\.css/)[0];
    return gulp.src(sources.index)
      .pipe(plugins.plumber({ errorHandler: catchError }))
      .pipe(plugins.replace('app.js', manifest['app.js']))
      .pipe(plugins.replace('dependencies.js', configManifest['dependencies.js']))
      .pipe(plugins.replace('templates.js', templateManifest['templates.js']))
      .pipe(plugins.replace('application.css', applicationSCSS))
      .pipe(plugins.minifyHtml({
        empty: true,
        comments: true,
        quotes: true,
        spare: true,
        conditionals: true
      }))
      .pipe(gulp.dest(destination));
  },

  views: function () {
    var appName = JSON.parse(fs.readFileSync(__dirname + '/package.json', "utf8"))['name'];
    return gulp.src(sources.views, { base: sources.app })
      .pipe(plugins.plumber({ errorHandler: catchError }))
      .pipe(plugins.minifyHtml({
        empty: true,
        comments: true,
        quotes: true,
        spare: true,
        conditionals: true
      }))
      .pipe(plugins.html2js({
        outputModuleName: appName + '.templates',
        base: 'app/'
      }))
      .pipe(plugins.concat('templates.js'))
      .pipe(plugins.ngAnnotate())
      .pipe(plugins.uglify())
      .pipe(plugins.rev())
      .pipe(gulp.dest(destination))
      .pipe(plugins.rev.manifest({ path: 'manifests/templates.json' }))
      .pipe(gulp.dest(destination));
  },

  images: function () {
    return gulp.src(sources.images, { base: sources.app })
      .pipe(plugins.plumber({ errorHandler: catchError }))
      .pipe(gulp.dest(destination));
  },

  dependencies: function () {
    return gulp.src(sources.dependencies)
      .pipe(plugins.plumber({ errorHandler: catchError }))
      .pipe(plugins.include({ extensions: ['js'] }))
      .pipe(plugins.rev())
      .pipe(gulp.dest(destination))
      .pipe(plugins.rev.manifest({ path: 'manifests/config.json' }))
      .pipe(gulp.dest(destination));
  },

  scripts: function () {
    return gulp.src(sources.appScript)
      .pipe(plugins.plumber({ errorHandler: catchError }))
      .pipe(plugins.include({ extensions: ['js'] }))
      .pipe(plugins.traceur({ modules: 'register' }))
      .pipe(plugins.ngAnnotate())
      .pipe(plugins.uglify())
      .pipe(plugins.replaceTask({ patterns: [{ json: ENV }] }))
      .pipe(plugins.rev())
      .pipe(gulp.dest(destination))
      .pipe(plugins.rev.manifest({ path: 'manifests/scripts.json' }))
      .pipe(gulp.dest(destination));
  }
};