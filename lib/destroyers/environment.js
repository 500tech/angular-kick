"use strict";

var fs      = require('fs-extra');
var logger    = require('../logger');
var format  = require('../formatters');

module.exports = function (name) {
  name = format.checkName('environment', name);

  logger.log('Destroying '.white + name.blue + ' environment...'.white);
  var environments = fs.readJSONSync('environments.json');
  delete environments[name];
  fs.writeJSONSync('environments.json', environments);
  logger.blankLine();
};
