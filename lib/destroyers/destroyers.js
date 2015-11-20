'use strict';

const types = require('lib/generated-types');

let destroyers = {};

types.angular.forEach((type) => destroyers[type] = require('lib/destroyers/' + type));

module.exports = destroyers;
