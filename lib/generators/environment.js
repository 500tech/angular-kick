'use strict';

const fs      = require('fs-extra');
const Format  = require('../format');
const Logger  = require('../logger');

module.exports = function (name) {
  name = Format.checkName('environment', name);

  const environments = fs.readJSONSync('environments.json');

  if (environments[name]) {
    Logger.warn(`Environment ${name} already exists`);
  } else {
    Logger.log(`${'Creating '.white} ${name.blue} ${'environment...'.white}`);

    // Hack to clone object
    let newEnvironment = JSON.parse(JSON.stringify(environments[Object.keys(environments)[0]]));

    newEnvironment.ENV = name;
    environments[name] = newEnvironment;
    fs.writeJSONSync('environments.json', environments);

    Logger.blankLine();
  }
};
