"use strict";

var fs      = require('fs-extra');
var logger  = require('../logger');
var message = require('../messages');

module.exports = function () {
  var app;

  if (fs.existsSync('package.json')) {
    app   = fs.readJSONSync('package.json');
  } else {
    logger.warn(message.about.noApp);
    process.exit(0);
  }

  logger.log('Application: '.white + app.name.blue);
  logger.log('Version:     '.white + app.version.blue);
  logger.log('AngularJS:   '.white + app.jspm.dependencies.angular.blue);

  logger.blankLine();
  logger.log('Build output directory: '.white + '/public'.blue);

};
