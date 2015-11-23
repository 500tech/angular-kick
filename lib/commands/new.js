'use strict';

const path    = require('path');
const fs      = require('fs-extra');
const copy    = require('cpr');
const ROOT    = path.resolve(__dirname, '../..');
const replace = require('replace');
const prompt  = require('readline-sync').question;
const Logger  = require('../logger');
const Utils   = require('../utils');
const FSUtils = require('../fs-utils');
const message = require('../messages');
const Format  = require('../format');
const setup   = require('../commands/setup');

module.exports = function () {
  let appName = Format.toConstName(process.argv[3]);
  let noSetup = (process.argv[4] || '').toLowerCase();

  noSetup = (noSetup === '--no-setup' || noSetup === '-ns');
  appName = Utils.ensureName('application', appName);

  const appFolderName = Format.toFolderName(appName);

  if (FSUtils.exists(appFolderName)) {
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

  copy(path.join(ROOT, 'templates', 'angular' ,'app'), appFolderName, () => {
    Logger.directoryTree(appFolderName);

    // Correctly handle dot-files
    ['gitignore', 'npmrc', 'eslintrc'].forEach((filename) => {
      let filePath = path.join(appFolderName, filename);
      fs.renameSync(filePath, filePath.replace(filename, `.${filename}`));
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
