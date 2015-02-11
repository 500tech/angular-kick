"use strict";

var fs      = require('fs-extra');
var logger  = require('../logger');

module.exports = function () {
  var app, bower;

  if (fs.existsSync('package.json')) {
    app   = fs.readJSONSync('package.json');
    bower = fs.readJSONSync('bower.json');
  } else {
    logger.warn('No application found or package.json file is corrupted');
    process.exit(1);
  }

  console.log('Application: '.white + app.name.blue);
  console.log('Version:     '.white + app.version.blue);
  console.log('AngularJS:   '.white + bower.dependencies.angular.blue);

  console.log('');
  console.log('Bower packages:'.white);
  Object.keys(bower.dependencies).forEach(function (component) {
    console.log('  ' + component.yellow + ' #' + bower.dependencies[component]);
  });

  console.log('');
  console.log('Build output directory: '.white + '/public'.blue);

};