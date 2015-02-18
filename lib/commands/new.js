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
      case 'yes':
      case 'y':
        fs.deleteSync(format.toFolderName(appName));
        break;
      default:
        return logger.warn(message.new.didNotOverride);
    }
  }

  logger.log('Creating new application: '.white + appName.white);

  copy(ROOT + '/templates/app', appFolderName, function () {
    logger.mkdir  (appFolderName + '/');
    logger.mkdir  ('  .tmp/');
    logger.mkdir  ('  app/');
    logger.mkdir  ('    assets/');
    logger.mkdir  ('      fonts/');
    logger.mkdir  ('      images/');
    logger.mkdir  ('      javascripts/');
    logger.mkdir  ('      stylesheets/');
    logger.create ('        application.scss');
    logger.create ('        main.scss');
    logger.create ('        normalize.scss');
    logger.mkdir  ('    config/');
    logger.mkdir  ('      routes/');
    logger.create ('        base.js');
    logger.create ('        static.js');
    logger.create ('      config.js');
    logger.create ('      constants.js');
    logger.create ('      decorators.js');
    logger.create ('      interceptors.js');
    logger.mkdir  ('    directives/');
    logger.create ('      if_env.js');
    logger.create ('      layout.js');
    logger.mkdir  ('    filters/');
    logger.mkdir  ('    layouts/');
    logger.create ('      application.html');
    logger.mkdir  ('    models/');
    logger.mkdir  ('    services/');
    logger.create ('      layouts.js');
    logger.mkdir  ('    states/');
    logger.mkdir  ('      home/');
    logger.create ('        home.html');
    logger.create ('        home.controller.js');
    logger.mkdir  ('      static/');
    logger.create ('        404.html');
    logger.create ('    app.js');
    logger.create ('    modules.js');
    logger.create ('    vendor.js');
    logger.create ('    index.html');
    logger.mkdir  ('  bower_components/');
    logger.mkdir  ('  gulp/');
    logger.mkdir  ('    common.js');
    logger.create ('    development_tasks.js');
    logger.create ('    error.html');
    logger.create ('    production_tasks.js');
    logger.mkdir  ('  test/');
    logger.mkdir  ('    mock/');
    logger.mkdir  ('    unit/');
    logger.mkdir  ('      controllers/');
    logger.mkdir  ('        home/');
    logger.create ('          home.controller.spec.js');
    logger.mkdir  ('      directives/');
    logger.create ('        if_env.spec.js');
    logger.create ('        layout.spec.js');
    logger.mkdir  ('      filters/');
    logger.mkdir  ('      services/');
    logger.create ('        layout.spec.js');
    logger.create ('  .gitignore');
    logger.create ('  bower.json/');
    logger.create ('  environments.json');
    logger.create ('  Gulpfile.js');
    logger.create ('  karma.conf.js');
    logger.create ('  karma-once.conf.js');
    logger.create ('  package.json');
    logger.create ('  README.md');

    fs.renameSync(appFolderName + '/gitignore', appFolderName + '/.gitignore');

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
