'use strict';

const Logger = require('../logger');
const Utils  = require('../utils');

var fs      = require('fs-extra');
var message = require('../messages');

module.exports = function () {
  let app;

  if (Utils.exists('package.json')) {
    app = fs.readJSONSync('package.json');
  } else {
    Logger.warn(message.about.noApp);
    process.exit(0);
  }

  Logger.log('Application: '.white + app.name.blue);
  Logger.log('Version:     '.white + app.version.blue);
  Logger.log('AngularJS:   '.white + app.dependencies.angular.blue);

  Logger.blankLine();
  Logger.log('Build output directory: '.white + '/public'.blue);
};
