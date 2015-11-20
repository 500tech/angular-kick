'use strict';

const TYPES = require('lib/generated-types');
let generators = {};

TYPES.angular.forEach((type) => generators[type] = require('lib/generators/' + type));

module.exports = generators;
