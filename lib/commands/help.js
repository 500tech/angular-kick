"use strict";

const Logger = require('../logger');

var message = require('../messages');

module.exports = function () {
  var term = process.argv[3];

  switch (term) {
    case 'about':
    case 'a':
      about();
      break;
    case 'new':
    case 'n':
      n();
      break;
    case 'generate':
    case 'g':
      generate();
      break;
    case 'destroy':
    case 'd':
      destroy();
      break;
    case 'setup':
      setup();
      break;
    case 'start':
    case 's':
      start();
      break;
    case 'bundle':
    case 'b':
      bundle();
      break;
    case 'test':
    case 't':
      test();
      break;
    case 'upgrade':
    case 'u':
      upgrade();
      break;
    case 'docs':
      docs();
      break;
    case 'karma-debug':
      karmaDebug();
      break;
    default:
      help();
  }
};

function about() {
  Logger.log(message.help.definition('about', 'a'));
  Logger.log('Displays useful information about application'.white);
}

function n() {
  Logger.log(message.help.definition('new', 'n'));
  Logger.log('Creates new AngularJS application using ES6 and best practices'.white);
}

function generate() {
  Logger.log(message.help.definition('generate', 'g'));
  Logger.log('Creates the following types:'.white);
  Logger.log(' – directive'.yellow);
  Logger.log('   Will be created in /app/directives directory');
  Logger.log('   kick generate directive smartTable'.dim);
  Logger.log(' – filter'.yellow);
  Logger.log('   Will be created in /app/filters directory');
  Logger.log('   kick generate filter camelize'.dim);
  Logger.log(' – partial'.yellow);
  Logger.log('   Will be created under a given state');
  Logger.log('   kick generate partial shared/header'.dim);
  Logger.log(' – service'.yellow);
  Logger.log('   Will be created in /app/services directory');
  Logger.log('   kick generate service Auth'.dim);
  Logger.log(' – model'.yellow);
  Logger.log('   Will be created in /app/model directory');
  Logger.log('   kick generate model User'.dim);
  Logger.log(' – state'.yellow);
  Logger.log('   Will create state and its routes');
  Logger.log('   kick generate state users'.dim);
  Logger.log(' – style'.yellow);
  Logger.log('   Will create a stylesheet and include it in application');
  Logger.log('   kick generate style buttons'.dim);
  Logger.log(' – config'.yellow);
  Logger.log('   Will create a config file in /app/config directory');
  Logger.log('   kick generate config permissions'.dim);
  Logger.log(' – environment'.yellow);
  Logger.log('   Will create a new environment in environments.json file');
  Logger.log('   kick generate environment staging'.dim);
}

function destroy() {
  Logger.log(message.help.definition('destroy', 'd'));
  Logger.log('Deletes folders and files specified for the following types:'.white);
  Logger.log(' – directive'.yellow);
  Logger.log('   kick destroy directive smartTable'.dim);
  Logger.log(' – filter'.yellow);
  Logger.log('   kick destroy filter camelize'.dim);
  Logger.log(' – partial'.yellow);
  Logger.log('   kick destroy partial shared/header'.dim);
  Logger.log(' – service'.yellow);
  Logger.log('   kick destroy service Auth'.dim);
  Logger.log(' – state'.yellow);
  Logger.log('   kick destroy model User'.dim);
  Logger.log(' – state'.yellow);
  Logger.log('   kick destroy state users'.dim);
  Logger.log(' – style'.yellow);
  Logger.log('   kick destroy style buttons'.dim);
  Logger.log(' – config'.yellow);
  Logger.log('   kick destroy config buttons'.dim);
  Logger.log(' – environment'.yellow);
  Logger.log('   kick destroy environment staging'.dim);
}

function setup() {
  Logger.log(message.help.definition('setup', 'set'));
  Logger.log('Runs npm install'.white);
}

function start() {
  Logger.log(message.help.definition('start', 's'));
  Logger.log('Runs webpack-dev-server with autoreload'.white);
}

function bundle() {
  Logger.log(message.help.definition('bundle', 'b'));
  Logger.log('Will concat, minify, uglify and other preparations to files and output the ready-to-use application in /public folder'.white);
}

function test() {
  Logger.log(message.help.definition('test', 't'));
  Logger.log('Single-pass tests with Karma'.white);
}

function upgrade() {
  Logger.log(message.help.definition('upgrade', 'u'));
  Logger.log('Check for new angular-kick version and ask to update'.white);
}

function help() {
  Logger.log('Available commands:'.white);
  Logger.log('   help         ' + 'h      ' + '                  ' + 'This command');
  Logger.log('   about        ' + 'a      ' + '                  ' + 'Displays useful information about application');
  Logger.log('   new          ' + 'n      ' + '<name>            ' + 'Creates AngularJS application from template');
  Logger.log('   generate     ' + 'g      ' + '<type> <name>     ' + 'Generates services, directives, filters, partials and states');
  Logger.log('   destroy      ' + 'd      ' + '<type> <name>     ' + 'Destroys services, directives, filters, partials and states');
  Logger.log('   setup        ' + 'set    ' + '                  ' + 'Download node modules');
  Logger.log('   start        ' + 's      ' + '[<env>]           ' + 'Run webpack-dev-server with auto-reload');
  Logger.log('   tdd          ' + '       ' + '[<env>]           ' + 'Run karma watcher');
  Logger.log('   bundle       ' + 'b      ' + '[<env>]           ' + 'Build application for production');
  Logger.log('   test         ' + 't      ' + '[<env>]           ' + 'Run test suit once');
  Logger.log('   upgrade      ' + 'u      ' + '                  ' + 'Check for new angular-kick version');
  Logger.log('   docs         ' + '       ' + '                  ' + 'Open documentation in browser');
  Logger.log('   karma-debug  ' + '       ' + '                  ' + 'Open karma debugger in browser');
  Logger.log('Run '+ 'help [command]'.blue + ' for more information');
}

function docs() {
  Logger.log('Command: ' + 'docs'.blue);
  Logger.log('Open angular-kick documentation in browser (http://www.angular-kick.com)'.white);
}

function karmaDebug() {
  Logger.log('Command: ' + 'karma-debug'.blue);
  Logger.log('Open karma debugger in browser (http://localhost:9876)'.white);
}
