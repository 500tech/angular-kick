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

  copy(ROOT + '/templates/app', appFolderName, function () {
    logger.mkdir  (appFolderName + '/');
    logger.mkdir  ('  .tmp/');
    logger.mkdir  ('  app/');
    logger.mkdir  ('    assets/');
    logger.mkdir  ('      fonts/');
    logger.mkdir  ('      images/');
    logger.mkdir  ('      javascripts/');
    logger.mkdir  ('      stylesheets/');
    logger.createFile ('        application.scss');
    logger.createFile ('        main.scss');
    logger.createFile ('        normalize.scss');
    logger.mkdir  ('    config/');
    logger.mkdir  ('      routes/');
    logger.createFile ('        home.js');
    logger.createFile ('        routes.js');
    logger.createFile ('        static.js');
    logger.createFile ('      config.js');
    logger.createFile ('      constants.js');
    logger.createFile ('      decorators.js');
    logger.createFile ('      interceptors.js');
    logger.mkdir  ('    directives/');
    logger.createFile ('      directives.js');
    logger.createFile ('      if_env.js');
    logger.createFile ('      layout.js');
    logger.mkdir  ('    filters/');
    logger.createFile ('      filters.js');
    logger.mkdir  ('    layouts/');
    logger.mkdir  ('      shared/');
    logger.createFile ('        _footer.html');
    logger.createFile ('        _header.html');
    logger.createFile ('      application.html');
    logger.mkdir  ('    models/');
    logger.createFile ('      models.js');
    logger.mkdir  ('    services/');
    logger.createFile ('      layouts.js');
    logger.createFile ('      services.js');
    logger.mkdir  ('    states/');
    logger.mkdir  ('      home/');
    logger.createFile ('        home.html');
    logger.createFile ('        home.js');
    logger.mkdir  ('      static/');
    logger.createFile ('        404.html');
    logger.createFile ('      states.js');
    logger.createFile ('    app.html');
    logger.createFile ('    app.js');
    logger.mkdir  ('  gulp/');
    logger.mkdir  ('    development/');
    logger.mkdir  ('    production/');
    logger.mkdir  ('    common.js');
    logger.createFile ('    error.html');
    logger.mkdir  ('  test/');
    logger.mkdir  ('    mock/');
    logger.mkdir  ('    unit/');
    logger.mkdir  ('      controllers/');
    logger.mkdir  ('        home/');
    logger.createFile ('          home.spec.js');
    logger.mkdir  ('      directives/');
    logger.createFile ('        if_env.spec.js');
    logger.createFile ('        layout.spec.js');
    logger.mkdir  ('      filters/');
    logger.mkdir  ('      models/');
    logger.mkdir  ('      services/');
    logger.createFile ('        layout.spec.js');
    logger.createFile ('  .gitignore');
    logger.createFile ('  config.js');
    logger.createFile ('  environments.json');
    logger.createFile ('  Gulpfile.js');
    logger.createFile ('  karma.conf.js');
    logger.createFile ('  karma-once.conf.js');
    logger.createFile ('  package.json');
    logger.createFile ('  README.md');

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
