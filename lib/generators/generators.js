'use strict';

const types = require('../generated_types');
let generators = {};

types.angular.forEach(function (type) {
  generators[type] = require('./' + type);
});

module.exports = generators;
