"use strict";

const Logger  = require('../logger');
const Utils   = require('../utils');
const fs      = require('fs-extra');
const copy    = require('cpr');
const ROOT    = __dirname + '/../..';
const replace = require('replace');
const message = require('../messages');
const prompt  = require('readline-sync').question;
const Format  = require('../format');
const setup   = require('./setup');
copy.limit    = 16;

module.exports = function () {
  let appName = Format.toConstName(process.argv[3]);
  let noSetup = (process.argv[4] || '').toLowerCase();

  noSetup = (noSetup === '--no-setup' || noSetup === '-ns');
  appName = Format.checkName('application', appName);

  const appFolderName = Format.toFolderName(appName);

  if (Utils.exists(appFolderName)) {
    Logger.log(message.new.alreadyExists(appName));

    const answer = prompt(`${message.new.overrideQuestion} ${message.yesNo}`);

    switch (answer.toLowerCase()) {
      case 'yes':
      case 'y':
        fs.removeSync(Format.toFolderName(appName));
        break;
      default:
        return Logger.warn(message.new.didNotOverride);
    }
  }

  Logger.log('Creating new application: '.white + appName.white);

  copy(ROOT + '/templates/angular/app', appFolderName,  () => {;
    Logger.directoryTree(appFolderName);

    fs.renameSync(appFolderName + '/gitignore', appFolderName + '/.gitignore');
    fs.renameSync(appFolderName + '/npmconfig', appFolderName + '/.npmconfig');

    replace({
      regex: "%APP_NAME%",
      replacement: appName,
      paths: [appFolderName],
      recursive: true,
      silent: true
    });

    Logger.blankLine();

    if (noSetup) {
      Logger.done()
    } else {
      process.chdir(appFolderName);
      setup();
    }
  });
};
