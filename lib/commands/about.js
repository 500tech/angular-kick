"use strict";

var fs      = require('fs-extra');
var logger  = require('../logger');

module.exports = function () {
  if (fs.existsSync('package.json')) {
    var app   = fs.readJSONSync('package.json');
    var bower = fs.readJSONSync('bower.json');
  } else {
    return logger.warn('No application found or package.json file is corrupted');
  }

  console.log('Application: '.white + app.name.blue);
  console.log('Version:     '.white + app.version.blue);
  console.log('AngularJS:   '.white + bower.dependencies['angular'].blue);

  console.log('');
  console.log('Bower packages:'.white);
  Object.keys(bower.dependencies).forEach(function (component) {
    console.log('  ' + component.yellow + ' #' + bower.dependencies[component]);
  });

  console.log('');
  console.log('Build output directory: '.white + '/public'.blue);

};