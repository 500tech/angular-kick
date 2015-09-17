'use strict';

const TYPES = require('../generated_types');
let generators = {};

TYPES.angular.forEach((type) => generators[type] = require('./' + type));

module.exports = generators;
