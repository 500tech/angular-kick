'use strict';

const fs     = require('fs-extra');
const Logger = require('../logger');
const Utils  = require('../utils');

module.exports = function (name) {
  name = Utils.ensureName('environment', name);

  Logger.log(`${'Destroying '.white} ${name.blue} ${' environment...'.white}`);

  const environments = fs.readJSONSync('environments.json');

  delete environments[name];

  fs.writeJSONSync('environments.json', environments);

  Logger.blankLine();
};
