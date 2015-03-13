"use strict";

var format    = require('./../formatters');
var logger    = require('../logger');
var templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('service', name);

  var subdirectories = name.split('/');
  name = subdirectories.pop();

  var serviceName         = format.toServiceName(name);
  var serviceFileName     = format.toJSFileName(serviceName);
  var serviceSpecFileName = format.toJSFileName(serviceName + '.spec');

  subdirectories = format.parentPath(subdirectories);

  templates.createDirectory('app/services/' + subdirectories);
  templates.createFile('app/services/' + subdirectories + serviceFileName, templates.service({
    serviceName: serviceName
  }));

  templates.createDirectory('test/unit/services/' + subdirectories);
  templates.createFile('test/unit/services/' + serviceSpecFileName, templates.testServiceUnit({
    serviceName: serviceName
  }));

  templates.appendToFile('app/services/services.js', "require('./" + subdirectories + serviceFileName.replace('.js', '') + "');\n");
  logger.blankLine();
};
