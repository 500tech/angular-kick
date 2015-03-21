"use strict";

var format    = require('./../formatters');
var logger    = require('../logger');
var utils     = require('../utils');
var templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('service', name);

  var subdirectories = name.split('/');
  name = subdirectories.pop();

  var serviceName         = format.toServiceName(name);
  var serviceFileName     = format.toJSFileName(serviceName);
  var serviceSpecFileName = format.toJSFileName(serviceName + '.spec');

  subdirectories = format.parentPath(subdirectories);

  utils.createDirectory('app/services/' + subdirectories);
  utils.createFile('app/services/' + subdirectories + serviceFileName, templates.service({
    serviceName: serviceName
  }));

  utils.createDirectory('test/unit/services/' + subdirectories);
  utils.createFile('test/unit/services/' + serviceSpecFileName, templates.testServiceUnit({
    serviceName: serviceName
  }));

  utils.appendToFile('app/services/services.js', "require('./" + subdirectories + serviceFileName.replace('.js', '') + "');\n");
  logger.blankLine();
};
