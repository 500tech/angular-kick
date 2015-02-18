"use strict";

var fs            = require('fs-extra');
var child_process = require('child_process');
var http          = require('http');
var logger        = require('../logger');
var message       = require('../messages');
var ROOT          = __dirname + '/../..';
var prompt        = require('readline-sync').question;
var kickVersion   = fs.readJSONSync(ROOT + '/package.json').version;

module.exports = function () {
  logger.log(message.upgrade.checking);
  http.get('http://registry.npmjs.org/angular-kick/latest', function (response) {
    var body = '';
    response.on('data', function(data) { body += data; });
    response.on('end', function() {
      var newVersion = JSON.parse(body).version;
      if (kickVersion === newVersion) {
        logger.log(message.upgrade.alreadyLatest(kickVersion));
      } else {
        logger.blankLine();
        logger.log(message.upgrade.available);
        logger.log(message.upgrade.yourVersion);

        logger.log(message.upgrade.question);
        var answer = prompt('    Yes'.green + ' or ' + 'No: '.red);

        switch (answer.toLowerCase()) {
          case 'yes':
          case 'y':
            logger.blankLine();
            upgradeKick();
            break;
          default:
            logger.blankLine();
            logger.log(message.upgrade.yourself);
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
