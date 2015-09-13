var types = require('../generated_types');
var destroyers = {};

types.angular.forEach(function (type) {
  destroyers[type] = require('./' + type);
});

module.exports = destroyers;