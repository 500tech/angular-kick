'use strict';

const fs      = require('fs-extra');
const format  = require('../formatters');
const logger  = require('../logger');

module.exports = function (name) {
  name = format.checkName('environment', name);

  const environments = fs.readJSONSync('environments.json');

  if (environments[name]) {
    logger.warn(`Environment ${name} already exists`);
  } else {
    logger.log(`${'Creating '.white} ${name.blue} ${'environment...'.white}`);

    // Hack to clone object
    let newEnvironment = JSON.parse(JSON.stringify(environments[Object.keys(environments)[0]]));

    newEnvironment.ENV = name;
    environments[name] = newEnvironment;
    fs.writeJSONSync('environments.json', environments);

    logger.blankLine();
  }
};
