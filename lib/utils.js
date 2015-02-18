var fs            = require('fs-extra');
var logger        = require('./logger');
var changeCase    = require('change-case');
var child_process = require('child_process');
var prompt        = require('readline-sync').question;
var appName;

if (fs.existsSync('package.json')) {
  appName = fs.readJSONSync('package.json').name;
} else {
  appName = '';
}

module.exports = {
  isEmptyDir:           isEmptyDir,
  ensurePackagesExist:  ensurePackagesExist,
  ensureGlobalModule:   ensureGlobalModule,
  ensureNodeVersion:    ensureNodeVersion,
  replaceInFile:        replaceInFile
};

function isEmptyDir(path) {
  var files = fs.readdirSync(path);
  return !files.length;
}

function ensurePackagesExist() {
  if (!fs.existsSync('node_modules') || !fs.existsSync('bower_components')) {
    logger.warn("Can't start server with missing packages".yellow);
    logger.log('Please run '.white + 'kick setup'.blue + ' first'.white);
    process.exit(0);
  }
}

function ensureGlobalModule(moduleName) {
  try {
    logger.log('Checking for ' + moduleName + ' presence...');
    child_process.execSync('npm list -g ' + moduleName);
    child_process.execSync(moduleName + ' -v');
  } catch (e) {
    logger.warn(moduleName + ' must be installed globally.');
    logger.log('Would you like to install ' + moduleName + ' now?');

    var result = prompt('Yes'.green + ' or ' + 'No: '.red).toLowerCase();

    if (result === 'yes' || result === 'y') {
      logger.log('Installing ' + moduleName + '...');
      child_process.execSync('npm install -g ' + moduleName);
      logger.done();
      process.exit(0);
    } else {
      logger.warn('Please install ' + moduleName + ' and run kick again.');
      process.exit(0);
    }
  }
}

function ensureNodeVersion() {
  try {
    child_process.execSync('node -v').toString();
  } catch (e) {
    logger.warn(' You need nodejs >= 0.12 in order to use angular-kick');
    process.exit(0);
  }
}

function replaceInFile(filename, replacements) {
  var file = fs.readFileSync(filename, 'utf8');
  Object.keys(replacements).forEach(function (key) {
    value = new RegExp('%' + changeCase.constantCase(key) + '%', 'g');
    file = file.replace(value, replacements[key]);
  })
  return file.replace(/%APP_NAME%/g, appName);
}

