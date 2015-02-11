"use strict";

var fs              = require('fs-extra');

var strings = fs.readFileSync(__dirname + '/../app/vendor.js').toString().match(/\/\/=.*require\s(.*)\n*/g);
var vendorFilesArray = [];
strings.forEach(function (string) {
  vendorFilesArray.push(string.match(/\/\/=.*require\s(.*)/)[1].replace('../', ''));
});

module.exports = {
  sources: {
    error:         __dirname + '/error.html',

    base:         'app',
    vendor:       'app/vendor.js',
    vendorFiles:  vendorFilesArray,

    app:          'app/app.js',
    modules:      'app/modules.js',
    configs:      'app/config/**/*.js',
    directives:   'app/directives/**/*.js',
    filters:      'app/filters/**/*.js',
    services:     'app/services/**/*.js',
    controllers:  'app/states/**/*.js',

    scripts:      ['app/**/*.js', '!app/vendor.js'],
    styles:       'app/assets/stylesheets/**/*.scss',
    mainStyle:    'app/assets/stylesheets/application.scss',

    images:       'app/assets/images/**',
    fonts:        'app/assets/fonts/**',
    views:        ['app/**/*.html', '!app/app.html'],
    index:        'app/app.html'
  },

  destinations: {
    development: '.tmp',
    test: '.test',
    production: 'public'
  },

  setENV: JSON.parse(fs.readFileSync(__dirname + '/../environments.json', "utf8"))
};