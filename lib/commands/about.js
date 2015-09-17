'use strict';

const Logger  = require('../logger');
const Utils   = require('../utils');
const fs      = require('fs-extra');
const message = require('../messages');

module.exports = function () {
  let app;

  if (Utils.exists('package.json')) {
    app = fs.readJSONSync('package.json');
  } else {
    Logger.warn(message.about.noApp);
    process.exit(0);
  }

  Logger.log(`
  ${'Application: '.white + app.name.blue}
  ${'Version:     '.white + app.version.blue}
  ${'AngularJS:   '.white + app.dependencies.angular.blue}

  ${'Build output directory: '.white + '/public'.blue}`)
};
