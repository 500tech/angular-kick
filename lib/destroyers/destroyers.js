'use strict';

const types = require('../generated-types');

let destroyers = {};

types.angular.forEach(function (type) {
  destroyers[type] = require('./' + type);
});

module.exports = destroyers;
