"use strict";

var fs          = require('fs-extra');
var spawn       = require('child_process').spawn;
var http        = require('http');
var logger      = require('../logger');
var ROOT        = __dirname + '/../..';
var prompt      = require('readline-sync').question;
var kickVersion = JSON.parse(fs.readFileSync(ROOT + '/package.json'))['version'];

module.exports = function () {
  console.log('Checking for updates...'.white);
  http.get('http://registry.npmjs.org/angular-kick/latest', function (response) {
    var body = '';
    response.on('data', function(data) { body += data; });
    response.on('end', function() {
      var newVersion = JSON.parse(body).version;
      if (kickVersion === newVersion) {
        console.log('You already have the latest version '.white + ('(' + kickVersion + ')').blue);
      } else {
        console.log('');
        console.log('  * New version of angular-kick is available: '.yellow + newVersion.green);
        console.log('    (You have '.dim + kickVersion.dim + ')'.dim);

        console.log('    Do you want to update angular-kick?'.white);
        var answer = prompt('    Yes'.green + ' or ' + 'No: '.red);

        switch (answer.toLowerCase()) {
          case 'yes':
          case 'y':
            console.log('');
            updateKick();
            break;
          default:
            console.log('');
            console.log('    OK. You can run '.yellow + 'npm update -g angular-kick'.blue + ' to update by yourself'.yellow);
            console.log('');
            return;
        }
      }
    })
  });

  function updateKick () {
    console.log('Updating angular-kick...'.white);
    var process = spawn('npm', ['update', '-g', 'angular-kick']);

    process.on('exit', function () {
      kickVersion = JSON.parse(fs.readFileSync(ROOT + '/package.json'))['version'];
      console.log('Your angular-kick version is now: '.green + kickVersion.blue);
      logger.done();
    });
  }
};