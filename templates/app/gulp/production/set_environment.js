var plugins = require('gulp-load-plugins')();
var common = require('../common');

module.exports = function () {
  var environments = common.environments;

  if (!process.argv[3]) {
    plugins.util.env.ENV = environments['production'];
  } else {
    var environment = process.argv[3].replace(/^--/, '');
    if (environments[environment]) {
      console.log('Setting ENV to ' + environment);
      plugins.util.env.ENV = environments[environment];
    } else {
      console.log('Environment "' + environment + '" was not found in environments.js file');
      console.log('Using default environment "production"');
      plugins.util.env.ENV = environments['production'];
    }
  }
};