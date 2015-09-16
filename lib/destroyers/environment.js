'use strict';

const fs     = require('fs-extra');
const logger = require('../logger');
const format = require('../formatters');

module.exports = function (name) {
  name = format.checkName('environment', name);

  logger.log(`${'Destroying '.white} ${name.blue} ${' environment...'.white}`);

  const environments = fs.readJSONSync('environments.json');

  delete environments[name];

  fs.writeJSONSync('environments.json', environments);

  logger.blankLine();
};
