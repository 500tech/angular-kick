'use strict';

const types = require('../generated_types');

let destroyers = {};

types.angular.forEach(function (type) {
  destroyers[type] = require('./' + type);
});

module.exports = destroyers;
