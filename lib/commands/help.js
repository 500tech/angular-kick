"use strict";

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
  console.log('Command: ' + 'about'.blue + ' or ' + 'a'.blue);
  console.log('Displays useful information about application'.white);
}

function n() {
  console.log('Command: ' + 'new'.blue + ' or ' + 'n'.blue);
  console.log('Creates new AngularJS application using ES6 and best practices'.white);
}

function generate() {
  console.log('Command: ' + 'generate'.blue + ' or ' + 'g'.blue);
  console.log('Creates the following types:'.white);
  console.log(' – directive'.yellow);
  console.log('   Will be created in /app/directives directory');
  console.log('   kick generate directive smartTable'.dim);
  console.log(' – filter'.yellow);
  console.log('   Will be created in /app/filters directory');
  console.log('   kick generate filter camelize'.dim);
  console.log(' – partial'.yellow);
  console.log('   Will be created under a given state');
  console.log('   kick generate partial shared/header'.dim);
  console.log(' – service'.yellow);
  console.log('   Will be created in /app/services directory');
  console.log('   kick generate service Auth'.dim);
  console.log(' – model'.yellow);
  console.log('   Will be created in /app/model directory');
  console.log('   kick generate model User'.dim);
  console.log(' – state'.yellow);
  console.log('   Will create state and its routes');
  console.log('   kick generate state users'.dim);
  console.log(' – style'.yellow);
  console.log('   Will create a stylesheet and include it in application');
  console.log('   kick generate style buttons'.dim);
  console.log(' – config'.yellow);
  console.log('   Will create a config file in /app/config directory');
  console.log('   kick generate config permissions'.dim);
  console.log(' – environment'.yellow);
  console.log('   Will create a new environment in environments.json file');
  console.log('   kick generate environment staging'.dim);
}

function destroy() {
  console.log('Command: ' + 'destroy'.blue + ' or ' + 'd'.blue);
  console.log('Deletes folders and files specified for the following types:'.white);
  console.log(' – directive'.yellow);
  console.log('   kick destroy directive smartTable'.dim);
  console.log(' – filter'.yellow);
  console.log('   kick destroy filter camelize'.dim);
  console.log(' – partial'.yellow);
  console.log('   kick destroy partial shared/header'.dim);
  console.log(' – service'.yellow);
  console.log('   kick destroy service Auth'.dim);
  console.log(' – state'.yellow);
  console.log('   kick destroy model User'.dim);
  console.log(' – state'.yellow);
  console.log('   kick destroy state users'.dim);
  console.log(' – style'.yellow);
  console.log('   kick destroy style buttons'.dim);
  console.log(' – config'.yellow);
  console.log('   kick destroy config buttons'.dim);
  console.log(' – environment'.yellow);
  console.log('   kick destroy environment staging'.dim);
}

function setup() {
  console.log('Command: ' + 'setup'.blue);
  console.log('Runs npm install and bower install'.white);
}

function server() {
  console.log('Command: ' + 'server'.blue + ' or ' + 's'.blue);
  console.log('Runs browserSync server with autoreload'.white);
}

function build() {
  console.log('Command: ' + 'build'.blue + ' or ' + 'b'.blue);
  console.log('Will concat, minify, uglify and other preparations to files and output the ready-to-use application in /public folder'.white);
}

function test() {
  console.log('Command: ' + 'test'.blue  + ' or ' + 't'.blue);
  console.log('Single-pass tests with Karma'.white);
}

function upgrade() {
  console.log('Command: ' + 'upgrade'.blue + ' or ' + 'u'.blue);
  console.log('Check for new angular-kick version and ask to update'.white);
}

function help() {
  console.log('Available commands:'.white);
  console.log('   help       ' + 'h      ' + '                  ' + 'This command');
  console.log('   about      ' + 'a      ' + '                  ' + 'Displays useful information about application');
  console.log('   new        ' + 'n      ' + '<name>            ' + 'Creates AngularJS application from template');
  console.log('   generate   ' + 'g      ' + '<type> <name>     ' + 'Generates services, directives, filters, partials and states');
  console.log('   setup      ' + '       ' + '                  ' + 'Download node and bower packages');
  console.log('   server     ' + 's      ' + '[--<env>]         ' + 'Run browserSync server with auto-reload');
  console.log('   server:tdd ' + 's:tdd  ' + '[--<env>]         ' + 'Run browserSync server with auto-reload along with karma watcher');
  console.log('   build      ' + 'b      ' + '[--<env>]         ' + 'Build application for production');
  console.log('   test       ' + 't      ' + '[--<env>]         ' + 'Run test suit');
  console.log('   update     ' + 'u      ' + '                  ' + 'Check for new angular-kick version');
  console.log('Run '+ 'help [command]'.blue + ' for more information');
}