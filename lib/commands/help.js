"use strict";

var logger  = require('../logger');
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
    case 'server':
    case 's':
      server();
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
  logger.log(message.help.definition('about', 'a'));
  logger.log('Displays useful information about application'.white);
}

function n() {
  logger.log(message.help.definition('new', 'n'));
  logger.log('Creates new AngularJS application using ES6 and best practices'.white);
}

function generate() {
  logger.log(message.help.definition('generate', 'g'));
  logger.log('Creates the following types:'.white);
  logger.log(' – directive'.yellow);
  logger.log('   Will be created in /app/directives directory');
  logger.log('   kick generate directive smartTable'.dim);
  logger.log(' – filter'.yellow);
  logger.log('   Will be created in /app/filters directory');
  logger.log('   kick generate filter camelize'.dim);
  logger.log(' – partial'.yellow);
  logger.log('   Will be created under a given state');
  logger.log('   kick generate partial shared/header'.dim);
  logger.log(' – service'.yellow);
  logger.log('   Will be created in /app/services directory');
  logger.log('   kick generate service Auth'.dim);
  logger.log(' – model'.yellow);
  logger.log('   Will be created in /app/model directory');
  logger.log('   kick generate model User'.dim);
  logger.log(' – state'.yellow);
  logger.log('   Will create state and its routes');
  logger.log('   kick generate state users'.dim);
  logger.log(' – style'.yellow);
  logger.log('   Will create a stylesheet and include it in application');
  logger.log('   kick generate style buttons'.dim);
  logger.log(' – config'.yellow);
  logger.log('   Will create a config file in /app/config directory');
  logger.log('   kick generate config permissions'.dim);
  logger.log(' – environment'.yellow);
  logger.log('   Will create a new environment in environments.json file');
  logger.log('   kick generate environment staging'.dim);
}

function destroy() {
  logger.log(message.help.definition('destroy', 'd'));
  logger.log('Deletes folders and files specified for the following types:'.white);
  logger.log(' – directive'.yellow);
  logger.log('   kick destroy directive smartTable'.dim);
  logger.log(' – filter'.yellow);
  logger.log('   kick destroy filter camelize'.dim);
  logger.log(' – partial'.yellow);
  logger.log('   kick destroy partial shared/header'.dim);
  logger.log(' – service'.yellow);
  logger.log('   kick destroy service Auth'.dim);
  logger.log(' – state'.yellow);
  logger.log('   kick destroy model User'.dim);
  logger.log(' – state'.yellow);
  logger.log('   kick destroy state users'.dim);
  logger.log(' – style'.yellow);
  logger.log('   kick destroy style buttons'.dim);
  logger.log(' – config'.yellow);
  logger.log('   kick destroy config buttons'.dim);
  logger.log(' – environment'.yellow);
  logger.log('   kick destroy environment staging'.dim);
}

function setup() {
  logger.log(message.help.definition('setup', 'set'));
  logger.log('Runs npm install and jspm install'.white);
}

function server() {
  logger.log(message.help.definition('server', 's'));
  logger.log('Runs browserSync server with autoreload'.white);
}

function bundle() {
  logger.log(message.help.definition('bundle', 'b'));
  logger.log('Will concat, minify, uglify and other preparations to files and output the ready-to-use application in /public folder'.white);
}

function test() {
  logger.log(message.help.definition('test', 't'));
  logger.log('Single-pass tests with Karma'.white);
}

function upgrade() {
  logger.log(message.help.definition('upgrade', 'u'));
  logger.log('Check for new angular-kick version and ask to update'.white);
}

function help() {
  logger.log('Available commands:'.white);
  logger.log('   help         ' + 'h      ' + '                  ' + 'This command');
  logger.log('   about        ' + 'a      ' + '                  ' + 'Displays useful information about application');
  logger.log('   new          ' + 'n      ' + '<name>            ' + 'Creates AngularJS application from template');
  logger.log('   generate     ' + 'g      ' + '<type> <name>     ' + 'Generates services, directives, filters, partials and states');
  logger.log('   destroy      ' + 'd      ' + '<type> <name>     ' + 'Destroys services, directives, filters, partials and states');
  logger.log('   setup        ' + 'set    ' + '                  ' + 'Download node modules');
  logger.log('   server       ' + 's      ' + '[--<env>]         ' + 'Run browserSync server with auto-reload');
  logger.log('   server:tdd   ' + 's:tdd  ' + '[--<env>]         ' + 'Run browserSync server with auto-reload along with karma watcher');
  logger.log('   bundle       ' + 'b      ' + '[--<env>]         ' + 'Build application for production');
  logger.log('   test         ' + 't      ' + '[--<env>]         ' + 'Run test suit');
  logger.log('   upgrade      ' + 'u      ' + '                  ' + 'Check for new angular-kick version');
  logger.log('   docs         ' + '       ' + '                  ' + 'Open documentation in browser');
  logger.log('   karma-debug  ' + '       ' + '                  ' + 'Open karma debugger in browser');
  logger.log('Run '+ 'help [command]'.blue + ' for more information');
}

function docs() {
  logger.log('Command: ' + 'docs'.blue);
  logger.log('Open angular-kick documentation in browser (http://www.angular-kick.com)'.white);
}

function karmaDebug() {
  logger.log('Command: ' + 'karma-debug'.blue);
  logger.log('Open karma debugger in browser (http://localhost:9876)'.white);
}