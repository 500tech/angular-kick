var fs = require('fs-extra');
var logger = require('./logger');
var child_process = require('child_process');
var prompt = require('readline-sync').question;

module.exports = {
  isEmptyDir: function (path) {
    var files = fs.readdirSync(path);
    return !files.length;
  },

  ensurePackagesExist: function () {
    if (!fs.existsSync('node_modules') || !fs.existsSync('bower_components')) {
      logger.warn("Can't start server with missing packages".yellow);
      console.log('Please run '.white + 'kick setup'.blue + ' first'.white);
      process.exit(0);
    }
  },

  ensureGlobalModules: function (moduleName) {
    try {
      logger.log('Checking for ' + moduleName + ' installation...');
      child_process.execSync('npm list -g ' + moduleName);
      child_process.execSync(moduleName + ' -v');

    } catch (e) {
      logger.warn(moduleName + ' must be installed globally.');
      logger.log('Would you like to install ' + moduleName + ' now?');

      var result = prompt('Yes'.green + ' or ' + 'No: '.red).toLowerCase();

      if (result == 'yes') {
        logger.log('Installing ' + moduleName + '...');
        child_process.execSync('npm install -g ' + moduleName);
        logger.done();
        return true;
      }

      if (result == 'no') {
        logger.log('Please install ' + moduleName + ' and run kick again.');
        return false;
      }
    }

    return true;
  }
};