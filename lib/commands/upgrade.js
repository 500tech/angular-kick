'use strict';

const path          = require('path');
const Logger        = require('../logger');
const fs            = require('fs-extra');
const http          = require('http');
const message       = require('../messages');
const ROOT          = path.resolve(__dirname, '../..');
const prompt        = require('readline-sync').question;
const Utils         = require('../utils');
let kickVersion     = fs.readJSONSync(path.join(ROOT , 'package.json')).version;

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
            upgradeKick(newVersion);
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

  function upgradeKick(newVersion) {
    Logger.log('Updating kick...'.white);

    Utils.execSync('npm', ['install', '-g', 'kick']);
    Logger.log('Your kick version is now: '.green + newVersion.blue);
    Logger.done();
  }
};
