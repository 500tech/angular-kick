"use strict";

var fs      = require('fs-extra');
var copy    = require('ncp').ncp;
var ROOT    = __dirname + '/../..';
var replace = require('replace');
var logger  = require('../logger');
var prompt  = require('readline-sync').question;
var format  = require('../formatters');
var setup   = require('./setup');
copy.limit  = 16;

module.exports = function () {
  var appName = format.toConstName(process.argv[3]);
  appName     = format.checkName('application', appName);
  if (!appName) return;

  var appFolderName = format.toFolderName(appName);

  if (fs.existsSync(appFolderName)) {
    console.log(('There is already an application called ' + appName.blue).yellow);
    console.log('Remove remove it and create a new one?'.white);
    var answer = prompt('Yes'.green + ' or ' + 'No: '.red);

    switch (answer.toLowerCase()) {
      case 'yes':
      case 'y':
        fs.deleteSync(format.toFolderName(appName));
        break;
      default:
        return logger.warn('Did not override existing application');
    }
  }

  console.log('Creating new application: '.white + appName.white);

  copy(ROOT + '/templates/app', appFolderName, function (error) {
    if (error) return logger.warn('lol' + error);

    logger.mkdir  (appFolderName);
    logger.mkdir  (appFolderName + '/.tmp');
    logger.mkdir  (appFolderName + '/app');
    logger.mkdir  (appFolderName + '/app/assets');
    logger.mkdir  (appFolderName + '/app/assets/fonts');
    logger.mkdir  (appFolderName + '/app/assets/images');
    logger.mkdir  (appFolderName + '/app/assets/javascripts');
    logger.mkdir  (appFolderName + '/app/assets/stylesheets');
    logger.create (appFolderName + '/app/assets/stylesheets/application.scss');
    logger.create (appFolderName + '/app/assets/stylesheets/normalize.scss');
    logger.mkdir  (appFolderName + '/app/config');
    logger.mkdir  (appFolderName + '/app/config/routes');
    logger.create (appFolderName + '/app/config/routes/base.js');
    logger.create (appFolderName + '/app/config/routes/static.js');
    logger.create (appFolderName + '/app/config/config.js');
    logger.create (appFolderName + '/app/config/constants.js');
    logger.create (appFolderName + '/app/config/decorators.js');
    logger.create (appFolderName + '/app/config/interceptors.js');
    logger.mkdir  (appFolderName + '/app/directives');
    logger.create (appFolderName + '/app/directives/if_env.js');
    logger.mkdir  (appFolderName + '/app/filters');
    logger.mkdir  (appFolderName + '/app/layouts');
    logger.mkdir  (appFolderName + '/app/layouts/application.html');
    logger.mkdir  (appFolderName + '/app/models');
    logger.mkdir  (appFolderName + '/app/services');
    logger.create (appFolderName + '/app/services/layouts.js');
    logger.mkdir  (appFolderName + '/app/states');
    logger.mkdir  (appFolderName + '/app/states/home');
    logger.create (appFolderName + '/app/states/home/home.html');
    logger.create (appFolderName + '/app/states/home/home.controller.js');
    logger.mkdir  (appFolderName + '/app/states/static');
    logger.create (appFolderName + '/app/states/static/404.html');
    logger.create (appFolderName + '/app/app.js');
    logger.create (appFolderName + '/app/index.html');
    logger.mkdir  (appFolderName + '/bower_components');
    logger.mkdir  (appFolderName + '/gulp');
    logger.mkdir  (appFolderName + '/gulp/common.js');
    logger.mkdir  (appFolderName + '/gulp/development_tasks');
    logger.mkdir  (appFolderName + '/gulp/production_tasks');
    logger.mkdir  (appFolderName + '/test');
    logger.mkdir  (appFolderName + '/test/mock');
    logger.mkdir  (appFolderName + '/test/unit');
    logger.mkdir  (appFolderName + '/test/unit/controllers');
    logger.mkdir  (appFolderName + '/test/unit/controllers/home');
    logger.create (appFolderName + '/test/unit/controllers/home/home.controller.spec.js');
    logger.mkdir  (appFolderName + '/test/unit/directives');
    logger.create (appFolderName + '/test/unit/directives/if_env.spec.js');
    logger.mkdir  (appFolderName + '/test/unit/filters');
    logger.mkdir  (appFolderName + '/test/unit/services');
    logger.create (appFolderName + '/test/unit/services/layout.spec.js');
    logger.create (appFolderName + '/.gitignore');
    logger.create (appFolderName + '/bower.json');
    logger.create (appFolderName + '/dependencies.js');
    logger.create (appFolderName + '/environments.json');
    logger.create (appFolderName + '/Gulpfile.js');
    logger.create (appFolderName + '/karma.conf.js');
    logger.create (appFolderName + '/karma-once.conf.js');
    logger.create (appFolderName + '/package.json');
    logger.create (appFolderName + '/README.md');

    fs.renameSync(appFolderName + '/gitignore', appFolderName + '/.gitignore');

    replace({
      regex: "%APP_NAME%",
      replacement: appName,
      paths: [appFolderName],
      recursive: true,
      silent: true
    });

    console.log('');
    process.chdir(appFolderName);
    setup();
  });
};