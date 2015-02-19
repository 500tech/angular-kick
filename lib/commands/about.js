"use strict";

var fs      = require('fs-extra');
var logger  = require('../logger');
var message = require('../messages');

module.exports = function () {
  var app, bower;

  if (fs.existsSync('package.json') && fs.existsSync('bower.json')) {
    app   = fs.readJSONSync('package.json');
    bower = fs.readJSONSync('bower.json');
  } else {
    logger.warn(message.about.noApp);
    process.exit(0);
  }

  logger.log('Application: '.white + app.name.blue);
  logger.log('Version:     '.white + app.version.blue);
  logger.log('AngularJS:   '.white + bower.dependencies.angular.blue);

  logger.blankLine();
  logger.log('Bower packages:'.white);
  Object.keys(bower.dependencies).forEach(function (component) {
    logger.log('  ' + component.yellow + ' #' + bower.dependencies[component]);
  });

  logger.blankLine();
  logger.log('Build output directory: '.white + '/public'.blue);

};
