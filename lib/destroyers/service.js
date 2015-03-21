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

  utils.destroyFile('app/services/' + subdirectories + serviceFileName);
  utils.destroyFile('test/unit/services/' + serviceSpecFileName);
  utils.destroyDirectoryIfEmpty('app/services/' + subdirectories);
  utils.destroyDirectoryIfEmpty('test/unit/services/' + subdirectories);
  utils.modifyFile('app/services/services.js', "require('./" + subdirectories + serviceFileName.replace('.js', '') + "');\n", '');
  logger.blankLine();
};
