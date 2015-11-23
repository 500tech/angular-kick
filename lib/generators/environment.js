'use strict';

const fs     = require('fs-extra');
const Utils  = require('../utils');
const Logger = require('../logger');

module.exports = function (name) {
  name = Utils.ensureName('environment', name);

  const environments = fs.readJSONSync('environments.json');

  if (environments[name]) {
    Logger.warn(`Environment ${name} already exists`);
  } else {
    Logger.log(`${'Creating '.white} ${name.blue} ${'environment...'.white}`);

    let newEnvironment = Object.assign({}, environments[Object.keys(environments)[0]]);

    newEnvironment.ENV = name;
    environments[name] = newEnvironment;
    fs.writeJSONSync('environments.json', environments);

    Logger.blankLine();
  }
};
