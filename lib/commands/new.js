'use strict';

const fs      = require('fs-extra');
const copy    = require('cpr');
const ROOT    = __dirname + '/../..';
const replace = require('replace');
const prompt  = require('readline-sync').question;
const Logger  = require('lib/logger');
const Utils   = require('lib/utils');
const message = require('lib/messages');
const Format  = require('lib/format');
const setup   = require('lib/commands/setup');

module.exports = function () {
  let appName = Format.toConstName(process.argv[3]);
  let noSetup = (process.argv[4] || '').toLowerCase();

  noSetup = (noSetup === '--no-setup' || noSetup === '-ns');
  appName = Utils.ensureName('application', appName);

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

  copy(ROOT + '/templates/angular/app', appFolderName, () => {
    Logger.directoryTree(appFolderName);

    // Correctly handle dot-files
    ['gitignore', 'npmconfig', 'eslintrc'].forEach((filename) => {
      fs.renameSync(`${appFolderName}/${filename}`, `${appFolderName}/.${filename}`);
    });

    replace({
      regex: "%APP_NAME%",
      replacement: appName,
      paths: [appFolderName],
      recursive: true,
      silent: true
    });

    Logger.blankLine();

    if (noSetup) {
      Logger.done();
      return;
    }

    process.chdir(appFolderName);
    setup();
  });
};
