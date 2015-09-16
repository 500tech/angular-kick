"use strict";
var colors      = require('colors');

module.exports = {
  unrecognizedCommand: unrecognizedCommand,
  noCommand: "You didn't specify any command",
  yesNo: 'Yes'.green + ' (default) or ' + 'No: '.red,
  missingPackages: "Can't start server with missing packages".yellow,
  runSetup: 'Please run '.white + 'kick setup'.blue + ' first'.white,
  oldNodeVersion: ' You need nodejs >= 4.0 in order to use angular-kick',
  checkingModulePresence: checkingModulePresence,
  moduleNotInstalled: moduleNotInstalled,
  installModuleQuestion: installModuleQuestion,
  installingModule: installingModule,
  pleaseInstall: pleaseInstall,

  about: {
    noApp: 'No application found or package.json file is corrupted'
  },

  bundle: {
    start: 'Building application to '.white + '/public'.blue + ' folder...'.white,
    done: 'Feel free to copy it as is.'.white
  },

  destroy: {
    whatToDestroy: 'What do you want to destroy?',
    help: '  Run ' + 'kick help destroy'.blue + ' to see all available options'
  },

  generate: {
    whatToGenerate: 'What do you want to generate?',
    help: '  Run ' + 'kick help generate'.blue + ' to see all available options'
  },

  help: {
    definition: commandDefinition
  },

  new: {
    alreadyExists: alreadyExists,
    overrideQuestion: 'Remove it and create a new one?'.white,
    didNotOverride: 'Did not override existing application'
  },

  server: {
    running: 'Running webpack-dev-server on ' + 'http://localhost:8080/'.white,
    testsRunning: 'Running Karma test server on ' + 'http://localhost:9876/'.white,
    stop: 'Press ' + 'CTRL+C'.red + ' to stop'
  },

  setup: {
    downloadingNpm: 'Downloading npm packages (approx. 100MB), this usually takes 5–7 minutes...'.white,
    done: 'Hurray! Your application is ready.'.white
  },

  test: {
    starting: 'Starting tests...'.white
  },

  upgrade: {
    checking: 'Checking for updates...'.white,
    alreadyLatest: alreadyLatestVersion,
    available: newVersionAvailable,
    yourVersion: currentVersion,
    upgradeQuestion: '    Do you want to update angular-kick?'.white,
    yourself: '    OK. You can run '.yellow + 'npm update -g angular-kick'.blue + ' to update by yourself'.yellow
  }
};

function unrecognizedCommand(command) {
  return "kick didn't recognize the ".yellow
    + command.blue
    + ' command. Run '.yellow
    + 'kick help'.blue
    + ' to see all available commands'.yellow
}

function checkingModulePresence(moduleName) {
  return 'Checking for ' + moduleName + ' presence...'
}

function moduleNotInstalled(moduleName) {
  return moduleName + ' must be installed globally.'
}

function installModuleQuestion(moduleName) {
  return 'Would you like to install ' + moduleName + ' now?'
}

function installingModule(moduleName) {
  return 'Installing ' + moduleName + '...'
}

function pleaseInstall(moduleName) {
  return 'Please install ' + moduleName + ' and run kick again.'
}

function commandDefinition(command, alias) {
  var output = 'Command: ' + command.blue;
  if (alias) {
    output += ' or ' + alias.blue
  }
  return output;
}

function alreadyExists(appName) {
  return 'There is already an application called '.yellow + appName.blue
}

function alreadyLatestVersion(kickVersion) {
  return 'You already have the latest version '.white + ('(' + kickVersion + ')').blue
}

function newVersionAvailable(newVersion) {
  return '  * New version of angular-kick is available: '.yellow + newVersion.green
}

function currentVersion(kickVersion) {
  return '    (You have '.dim + kickVersion.dim + ')'.dim
}
