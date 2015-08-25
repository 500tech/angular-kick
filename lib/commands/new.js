"use strict";

var fs      = require('fs-extra');
var copy    = require('ncp').ncp;
var ROOT    = __dirname + '/../..';
var replace = require('replace');
var logger  = require('../logger');
var message = require('../messages');
var prompt  = require('readline-sync').question;
var format  = require('../formatters');
var setup   = require('./setup');
copy.limit  = 16;

module.exports = function () {
  var appName = format.toConstName(process.argv[3]);
  var noSetup = (process.argv[4] || '').toLowerCase();
  noSetup = (noSetup === '--no-setup' || noSetup === '-ns');
  appName = format.checkName('application', appName);

  var appFolderName = format.toFolderName(appName);

  if (fs.existsSync(appFolderName)) {
    logger.log(message.new.alreadyExists(appName));
    logger.log(message.new.overrideQuestion);
    var answer = prompt(message.yesNo);

    switch (answer.toLowerCase()) {
      case '':
      case 'yes':
      case 'y':
        fs.deleteSync(format.toFolderName(appName));
        break;
      default:
        return logger.warn(message.new.didNotOverride);
    }
  }

  logger.log('Creating new application: '.white + appName.white);

  copy(ROOT + '/templates/angular/app', appFolderName, function () {
    logger.directoryTree(appFolderName);

    fs.renameSync(appFolderName + '/gitignore', appFolderName + '/.gitignore');
    fs.renameSync(appFolderName + '/npmconfig', appFolderName + '/.npmconfig');

    replace({
      regex: "%APP_NAME%",
      replacement: appName,
      paths: [appFolderName],
      recursive: true,
      silent: true
    });

    logger.blankLine();

    if (noSetup) {
      logger.done()
    } else {
      process.chdir(appFolderName);
      setup();
    }
  });
};