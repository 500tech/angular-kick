'use strict';

const fs     = require('fs-extra');
const Logger = require('../logger');
const Format = require('../format');

module.exports = function (name) {
  name = Format.checkName('environment', name);

  Logger.log(`${'Destroying '.white} ${name.blue} ${' environment...'.white}`);

  const environments = fs.readJSONSync('environments.json');

  delete environments[name];

  fs.writeJSONSync('environments.json', environments);

  Logger.blankLine();
};
