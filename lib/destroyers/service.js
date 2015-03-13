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

  templates.destroyFile('app/services/' + subdirectories + serviceFileName);
  templates.destroyFile('test/unit/services/' + serviceSpecFileName);
  templates.destroyDirectoryIfEmpty('app/services/' + subdirectories);
  templates.destroyDirectoryIfEmpty('test/unit/services/' + subdirectories);
  templates.modifyFile('app/services/services.js', "require('./" + subdirectories + serviceFileName.replace('.js', '') + "');\n", '');
  logger.blankLine();
};
