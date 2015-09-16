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

  http.get('http://registry.npmjs.org/angular-kick/latest', response => {
    let body = '';

    response.on('data', data => body += data);

    response.on('end', () => {
      const newVersion = JSON.parse(body).version;

      if (kickVersion === newVersion) {
        logger.log(message.upgrade.alreadyLatest(kickVersion));
      } else {
        logger.blankLine();
        logger.log(message.upgrade.available(newVersion));
        logger.log(message.upgrade.yourVersion(kickVersion));

        logger.log(message.upgrade.upgradeQuestion);
        const answer = prompt('    Yes'.green + ' or ' + 'No: '.red);

        switch (answer.toLowerCase()) {
          case '':
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

  function upgradeKick() {
    logger.log('Updating angular-kick...'.white);
    child_process.execSync('npm update -g angular-kick');
    kickVersion = fs.readJSONSync(ROOT + '/package.json').version;
    logger.log('Your angular-kick version is now: '.green + kickVersion.blue);
    logger.done();
  }
};
