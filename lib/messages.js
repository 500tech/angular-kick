'use strict';
const colors = require('colors');

module.exports = {
  noCommand: "You didn't specify any command",
  yesNo: '[y/N]:',
  missingPackages: "Can't start server with missing packages".yellow,
  runSetup: 'Please run '.white + 'kick setup'.blue + ' first'.white,
  unrecognizedCommand,
  checkingModulePresence,
  moduleNotInstalled,
  installModuleQuestion,
  installingModule,
  pleaseInstall,
  didYouMean,

  about: {
    noApp: 'No application found or package.json file is corrupted'
  },

  bundle: {
    start: 'Building application to '.white + '/dist'.blue + ' folder...'.white,
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
    alreadyExists,
    overrideQuestion: 'Remove it and create a new one?'.white,
    didNotOverride: 'Did not override existing application'
  },

  server: {
    running: serverRunning,
    testsRunning: 'Running Karma test server on ' + 'http://localhost:9876/'.white,
    commands: `
    ${'CTRL+C'.red}: Stop server
    ${'CTRL+R'.yellow}: Restart server
    ${'CTRL+O'.green}: Open app in browser
    `
  },

  setup: {
    downloadingNpm: `
${'Downloading npm packages...'.white}

NPM is built in the way thay you should install packages
locally for every project. That's why we have to do this.

Packages for the application weight approx. ${'100MB'.white},
this usually takes ${'5–7 minutes'.white}, but might take less
if packages were already downloaded and cached.
    `,
    done: 'Hurray! Your application is ready.'.white
  },

  test: {
    starting: 'Starting tests...'.white
  },

  lint: {
    starting: 'Linting code...'.white
  },

  upgrade: {
    checking: 'Checking for updates...'.white,
    alreadyLatest: alreadyLatestVersion,
    available: newVersionAvailable,
    yourVersion: currentVersion,
    upgradeQuestion: '    Do you want to update kick?'.white,
    yourself: '    OK. You can run '.yellow + 'npm update -g kick'.blue + ' to update by yourself'.yellow
  }
};

function serverRunning(availablePort) {
  return 'Running webpack-dev-server on ' + 'http://localhost:'.white + availablePort.toString().white
}

function didYouMean(intention) {
  return "Did you mean ".white + intention.blue + "?".white;
}

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
  let output = `Command: ${command.blue}`;

  if (alias) {
    output += ` or ${alias.blue}`
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
  return '  * New version of kick is available: '.yellow + newVersion.green
}

function currentVersion(kickVersion) {
  return '    (You have '.dim + kickVersion.dim + ')'.dim
}
