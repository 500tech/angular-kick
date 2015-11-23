'use strict';

const TYPES = require('../generated-types');
let generators = {};

TYPES.angular.forEach((type) => generators[type] = require('../generators/' + type));

module.exports = generators;
