var types = require('../generated_types');
var generators = {};

types.angular.forEach(function (type) {
  generators[type] = require('./' + type);
});

module.exports = generators;