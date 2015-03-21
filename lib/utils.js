var fs            = require('fs-extra');
var logger        = require('./logger');
var message       = require('./messages');
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
  isEmptyDir:               isEmptyDir,
  ensurePackagesExist:      ensurePackagesExist,
  ensureGlobalModule:       ensureGlobalModule,
  ensureNodeVersion:        ensureNodeVersion,
  replaceInFile:            replaceInFile,
  createFile:               createFile,
  appendToFile:             appendToFile,
  modifyFile:               modifyFile,
  createDirectory:          createDirectory,
  destroyFile:              destroyFile,
  destroyDirectoryIfEmpty:  destroyDirectoryIfEmpty
};

function isEmptyDir(path) {
  var files = fs.readdirSync(path);
  return !files.length;
}

function ensurePackagesExist() {
  if (!fs.existsSync('node_modules') || !fs.existsSync('jspm_packages')) {
    logger.warn(message.missingPackages);
    logger.log(message.runSetup);
    process.exit(0);
  }
}

function ensureGlobalModule(moduleName) {
  try {
    logger.log(message.checkingModulePresence(moduleName));
    child_process.execSync(moduleName + ' -v');
  } catch (e) {
    logger.warn(message.moduleNotInstalled(moduleName));
    logger.log(message.installModuleQuestion(moduleName));

    var result = prompt(message.yesNo).toLowerCase();

    if (result === 'yes' || result === 'y' || result === '') {
      logger.log(message.installingModule(moduleName));
      child_process.execSync('npm install -g ' + moduleName);
      logger.done();
      process.exit(0);
    } else {
      logger.warn(message.pleaseInstall(moduleName));
      process.exit(0);
    }
  }
}

function ensureNodeVersion() {
  try {
    child_process.execSync('node -v').toString();
  } catch (e) {
    logger.warn(message.oldNodeVersion);
    process.exit(0);
  }
}

function replaceInFile(filename, replacements) {
  var file = fs.readFileSync(filename, 'utf8');
  Object.keys(replacements).forEach(function (key) {
    var value = new RegExp('%' + changeCase.constantCase(key) + '%', 'g');
    file = file.replace(value, replacements[key]);
  });
  return file.replace(/%APP_NAME%/g, appName);
}

function createFile(filename, template) {
  logger.create(filename);
  return fs.writeFileSync(filename, template);
}

function appendToFile(filename, string) {
  if (!fs.existsSync(filename)) { return; }
  logger.modify(filename);
  if (fs.readFileSync(filename, 'utf-8').match(/\n$/)) {
    return fs.appendFileSync(filename, string);
  } else {
    return fs.appendFileSync(filename, '\n' + string);
  }
}

function modifyFile(filename, pattern, template) {
  if (!fs.existsSync(filename)) { return; }
  logger.modify(filename);
  return fs.writeFileSync(filename,
    fs.readFileSync(filename, 'utf8').replace(pattern, template)
  );
}

function createDirectory(name) {
  if (!fs.existsSync(name)) { logger.mkdir(name); }
  return fs.ensureDirSync(name);
}

function destroyFile(filename) {
  if (fs.existsSync(filename)) { logger.destroy(filename); }
  return fs.deleteSync(filename);
}

function destroyDirectoryIfEmpty(name) {
  if (name.match(/app\/[^\/]*\/$/)) { return; }
  if (name.match(/test\/unit\/[^\/]*\/$/)) { return; }
  if (name.match(/test\/mock\/[^\/]*\/$/)) { return; }
  if (fs.existsSync(name) && isEmptyDir(name)) {
    logger.rmdir(name);
    return fs.deleteSync(name);
  }
}