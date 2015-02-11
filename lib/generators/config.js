"use strict";

var fs        = require('fs-extra');
var format    = require('../formatters');
var templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('config', name);

  var subdirectories = name.split('/');
  name = subdirectories.pop();

  var configFileName      = format.toJSFileName(name);

  subdirectories = format.parentPath(subdirectories);

  templates.createDirectory('app/config/' + subdirectories);
  templates.createFile('app/config/' + subdirectories + configFileName, templates.config());
  console.log('');
};