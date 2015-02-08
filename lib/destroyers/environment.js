"use strict";

var fs      = require('fs-extra');
var format  = require('../formatters');

module.exports = function (name) {
  name = format.checkName('environment', name);
  if (!name) return;

  console.log('Destroying '.white + name.blue + ' environment...'.white);
  var environments = fs.readJSONSync('environments.json');
  delete environments[name];
  fs.writeJSONSync('environments.json', environments);
  console.log('');
};