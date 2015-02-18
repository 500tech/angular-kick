"use strict";

var logger = require('../logger');

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
    case 'build':
    case 'b':
      build();
      break;
    case 'test':
    case 't':
      test();
      break;
    case 'upgrade':
    case 'u':
      upgrade();
      break;
    default:
      help();
  }
};

function about() {
  logger.log('Command: ' + 'about'.blue + ' or ' + 'a'.blue);
  logger.log('Displays useful information about application'.white);
}

function n() {
  logger.log('Command: ' + 'new'.blue + ' or ' + 'n'.blue);
  logger.log('Creates new AngularJS application using ES6 and best practices'.white);
}

function generate() {
  logger.log('Command: ' + 'generate'.blue + ' or ' + 'g'.blue);
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
  logger.log('Command: ' + 'destroy'.blue + ' or ' + 'd'.blue);
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
  logger.log('Command: ' + 'setup'.blue + ' or ' + 'set'.blue);
  logger.log('Runs npm install and bower install'.white);
}

function server() {
  logger.log('Command: ' + 'server'.blue + ' or ' + 's'.blue);
  logger.log('Runs browserSync server with autoreload'.white);
}

function build() {
  logger.log('Command: ' + 'build'.blue + ' or ' + 'b'.blue);
  logger.log('Will concat, minify, uglify and other preparations to files and output the ready-to-use application in /public folder'.white);
}

function test() {
  logger.log('Command: ' + 'test'.blue  + ' or ' + 't'.blue);
  logger.log('Single-pass tests with Karma'.white);
}

function upgrade() {
  logger.log('Command: ' + 'upgrade'.blue + ' or ' + 'u'.blue);
  logger.log('Check for new angular-kick version and ask to update'.white);
}

function help() {
  logger.log('Available commands:'.white);
  logger.log('   help       ' + 'h      ' + '                  ' + 'This command');
  logger.log('   about      ' + 'a      ' + '                  ' + 'Displays useful information about application');
  logger.log('   new        ' + 'n      ' + '<name>            ' + 'Creates AngularJS application from template');
  logger.log('   generate   ' + 'g      ' + '<type> <name>     ' + 'Generates services, directives, filters, partials and states');
  logger.log('   setup      ' + 'set    ' + '                  ' + 'Download node and bower packages');
  logger.log('   server     ' + 's      ' + '[--<env>]         ' + 'Run browserSync server with auto-reload');
  logger.log('   server:tdd ' + 's:tdd  ' + '[--<env>]         ' + 'Run browserSync server with auto-reload along with karma watcher');
  logger.log('   build      ' + 'b      ' + '[--<env>]         ' + 'Build application for production');
  logger.log('   test       ' + 't      ' + '[--<env>]         ' + 'Run test suit');
  logger.log('   upgrade     ' + 'u      ' + '                  ' + 'Check for new angular-kick version');
  logger.log('Run '+ 'help [command]'.blue + ' for more information');
}
