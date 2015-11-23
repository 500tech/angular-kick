'use strict';

const types = require('../generated-types');

let destroyers = {};

types.angular.forEach((type) => destroyers[type] = require('../destroyers/' + type));

module.exports = destroyers;
