"use strict";

var fs              = require('fs-extra');

var jsFiles   = fs.readFileSync(__dirname + '/../app/vendor.js').toString().match(/\/\/=.*[require|include]\s(.*)\n*/g) || [];
var cssFiles  = fs.readFileSync(__dirname + '/../app/assets/stylesheets/application.scss').toString().match(/\/\/=.*[require|include]\s(.*)\n*/g) || [];
var vendorCssFiles  = fs.readFileSync(__dirname + '/../app/assets/stylesheets/vendor.scss').toString().match(/\/\/=.*[require|include]\s(.*)\n*/g) || [];
var vendorFilesArray = [],
  vendorStyleFilesArray = [],
  styleFilesArray  = [];

jsFiles.forEach(function (string) {
  vendorFilesArray.push(string.match(/\/\/=.*[require|include]\s(.*)/)[1].replace('../', ''));
});

cssFiles.forEach(function (string) {
  var file = string.match(/\/\/=.*[require|include]\s(.*)/)[1].replace('../', '');
  styleFilesArray.push('app/assets/stylesheets/' + file);
});

vendorCssFiles.forEach(function (string) {
  var file = string.match(/\/\/=.*[require|include]\s(.*)/)[1];
  vendorStyleFilesArray.push('app/assets/stylesheets/' + file);
});

module.exports = {
  sources: {
    error:         __dirname + '/error.html',
    base:         'app',

    app:          'app/app.js',
    modules:      'app/modules.js',
    configs:      'app/config/**/*.js',
    directives:   'app/directives/**/*.js',
    filters:      'app/filters/**/*.js',
    models:       'app/models/**/*.js',
    services:     'app/services/**/*.js',
    controllers:  ['app/states/**/*.js', 'app/layouts/**/*.js'],

    scripts:      ['app/**/*.js', '!app/vendor.js'],
    styles:       'app/assets/stylesheets/**/*.scss',
    styleFiles:   styleFilesArray,
    mainStyle:    'app/assets/stylesheets/application.scss',

    images:       'app/assets/images/**',
    fonts:        'app/assets/fonts/**',
    views:        ['app/**/*.html', '!app/app.html'],
    index:        'app/app.html',

    vendor: {
      scripts:  vendorFilesArray,
      scriptsFile: 'app/vendor.js',
      styles:   vendorStyleFilesArray,
      stylesFile: 'app/assets/stylesheets/vendor.scss'
    }
  },

  destinations: {
    development: '.tmp',
    test: '.test',
    production: 'public'
  },

  setENV: JSON.parse(fs.readFileSync(__dirname + '/../environments.json', "utf8"))
};