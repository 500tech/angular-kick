"use strict";

var fs      = require('fs-extra');
var logger  = require('../logger');

module.exports = function () {
  var app, bower;

  if (fs.existsSync('package.json')) {
    app   = fs.readJSONSync('package.json');
    bower = fs.readJSONSync('bower.json');
  } else {
    logger.warn('No application found or package.json file is corrupted');
    process.exit(1);
  }

  logger.log('Application: '.white + app.name.blue);
  logger.log('Version:     '.white + app.version.blue);
  logger.log('AngularJS:   '.white + bower.dependencies.angular.blue);

  logger.log('');
  logger.log('Bower packages:'.white);
  Object.keys(bower.dependencies).forEach(function (component) {
    logger.log('  ' + component.yellow + ' #' + bower.dependencies[component]);
  });

  logger.log('');
  logger.log('Build output directory: '.white + '/public'.blue);

};
