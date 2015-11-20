'use strict';

const fs      = require('fs-extra');
const Logger  = require('lib/logger');
const Utils   = require('lib/utils');
const message = require('lib/messages');

module.exports = function () {
  if (!Utils.exists('package.json')) {
    Logger.warn(message.about.noApp);
    process.exit(0);
  }

  const app = fs.readJSONSync('package.json');

  Logger.log(`
  ${'Application: '.white + app.name.blue}
  ${'Version:     '.white + app.version.blue}
  ${'AngularJS:   '.white + app.dependencies.angular.blue}

  ${'Build output directory: '.white + '/dist'.blue}`)
};
