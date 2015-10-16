'use strict';

const Logger        = require('../logger');
const fs            = require('fs-extra');
const child_process = require('child_process');
const http          = require('http');
const message       = require('../messages');
const ROOT          = __dirname + '/../..';
const prompt        = require('readline-sync').question;
let kickVersion     = fs.readJSONSync(ROOT + '/package.json').version;

module.exports = function () {
  Logger.log(message.upgrade.checking);

  http.get('http://registry.npmjs.org/kick/latest', (response) => {
    let body = '';

    response.on('data', (data) => body += data);
    response.on('end', () => {
      const newVersion = JSON.parse(body).version;

      if (kickVersion === newVersion) {
        Logger.log(message.upgrade.alreadyLatest(kickVersion));
      } else {
        Logger.blankLine();
        Logger.log(message.upgrade.available(newVersion));
        Logger.log(message.upgrade.yourVersion(kickVersion));

        Logger.log(message.upgrade.upgradeQuestion);
        const answer = prompt('    Yes'.green + ' or ' + 'No: '.red);

        switch (answer.toLowerCase()) {
          case '':
          case 'yes':
          case 'y':
            Logger.blankLine();
            upgradeKick();
            break;
          default:
            Logger.blankLine();
            Logger.log(message.upgrade.yourself);
            Logger.blankLine();
            return;
        }
      }
    });
  });

  function upgradeKick() {
    Logger.log('Updating kick...'.white);

    child_process.execSync('npm install -g kick');
    kickVersion = fs.readJSONSync(ROOT + '/package.json').version;
    Logger.log('Your kick version is now: '.green + kickVersion.blue);
    Logger.done();
  }
};
