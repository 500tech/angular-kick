"use strict";

var fs      = require('fs-extra');
var format  = require('../formatters');
var logger  = require('../logger');

module.exports = function (name) {
  name = format.checkName('environment', name);
  if (!name) return;

  var environments = fs.readJSONSync('environments.json');

  if (environments[name]) {
    logger.warn('Environment ' + name + ' already exists');
  } else {
    console.log('Creating '.white + name.blue + ' environment...'.white);
    var newEnvironment = environments[Object.keys(environments)[0]];
    newEnvironment.ENV = name;
    environments[name] = newEnvironment;
    fs.writeJSONSync('environments.json', environments);
    console.log('');
  }
};