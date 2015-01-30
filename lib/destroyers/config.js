"use strict";

var fs        = require('fs-extra');
var format    = require('../formatters');
var templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('config', name);
  if (!name) return;

  var subdirectories = name.split('/');
  name = subdirectories.pop();

  var configFileName      = format.toJSFileName(name);

  subdirectories = format.parentPath(subdirectories);

  templates.destroyFile('app/config/' + subdirectories + configFileName, templates.config());
  templates.destroyDirectoryIfEmpty('app/config/' + subdirectories);
  console.log('');
};