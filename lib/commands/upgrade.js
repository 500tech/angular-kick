"use strict";

var fs            = require('fs-extra');
var child_process = require('child_process');
var http          = require('http');
var logger        = require('../logger');
var ROOT          = __dirname + '/../..';
var prompt        = require('readline-sync').question;
var kickVersion   = fs.readJSONSync(ROOT + '/package.json').version;

module.exports = function () {
  logger.log('Checking for updates...'.white);
  http.get('http://registry.npmjs.org/angular-kick/latest', function (response) {
    var body = '';
    response.on('data', function(data) { body += data; });
    response.on('end', function() {
      var newVersion = JSON.parse(body).version;
      if (kickVersion === newVersion) {
        logger.log('You already have the latest version '.white + ('(' + kickVersion + ')').blue);
      } else {
        logger.blankLine();
        logger.log('  * New version of angular-kick is available: '.yellow + newVersion.green);
        logger.log('    (You have '.dim + kickVersion.dim + ')'.dim);

        logger.log('    Do you want to update angular-kick?'.white);
        var answer = prompt('    Yes'.green + ' or ' + 'No: '.red);

        switch (answer.toLowerCase()) {
          case '':
          case 'yes':
          case 'y':
            logger.blankLine();
            upgradeKick();
            break;
          default:
            logger.blankLine();
            logger.log('    OK. You can run '.yellow + 'npm update -g angular-kick'.blue + ' to update by yourself'.yellow);
            logger.blankLine();
            return;
        }
      }
    });
  });

  function upgradeKick () {
    logger.log('Updating angular-kick...'.white);
    child_process.execSync('npm update -g angular-kick');
    kickVersion = fs.readJSONSync(ROOT + '/package.json').version;
    logger.log('Your angular-kick version is now: '.green + kickVersion.blue);
    logger.done();
  }
};
