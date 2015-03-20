"use strict";

var fs              = require('fs-extra');

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

    scripts:      'app/**/*.js',
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

  environments: JSON.parse(fs.readFileSync(__dirname + '/../environments.json', "utf8"))
};