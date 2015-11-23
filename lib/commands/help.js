'use strict';

const Logger  = require('../logger');
const message = require('../messages');

module.exports = function () {
  const term = process.argv[3];

  switch (term) {
    case 'about':
    case 'a':
      return about();
    case 'new':
    case 'n':
      return n();
    case 'generate':
    case 'g':
      return generate();
    case 'destroy':
    case 'd':
      return destroy();
    case 'setup':
      return setup();
    case 'start':
    case 's':
      return start();
    case 'bundle':
    case 'build':
    case 'b':
      return bundle();
    case 'test':
    case 't':
      return test();
    case 'lint':
      return lint();
    case 'upgrade':
    case 'u':
      return upgrade();
    case 'docs':
      return docs();
    case 'karma-debug':
      return karmaDebug();
    default:
      return help();
  }
};

function about() {
  Logger.log(`${message.help.definition('about', 'a')}
${'Displays useful information about application'.white}`)
}

function n() {
  Logger.log(`${message.help.definition('new', 'n')}
${'Creates new AngularJS application using ES6 and best practices'.white}`)
}

function generate() {
  Logger.log(message.help.definition('generate', 'g'));
  Logger.log('Creates the following types:'.white);
  Logger.log(' – directive'.yellow);
  Logger.log('   Will be created in /app/directives directory');
  Logger.log('   kick generate directive smartTable'.dim);
  Logger.log(' – component'.yellow);
  Logger.log('   Will be created in /app/components directory');
  Logger.log('   kick generate component smartTable'.dim);
  Logger.log(' – filter'.yellow);
  Logger.log('   Will be created in /app/filters directory');
  Logger.log('   kick generate filter camelize'.dim);
  Logger.log(' – partial'.yellow);
  Logger.log('   Will be created in /partials directory');
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
  Logger.log(`${message.help.definition('destroy', 'd')}
${'Deletes folders and files specified for the following types:'.white}
${' – directive'.yellow}
${'   kick destroy directive smartTable'.dim}
${' – component'.yellow}
${'   kick destroy component smartTable'.dim}
${' – filter'.yellow}
${'   kick destroy filter camelize'.dim}
${' – partial'.yellow}
${'   kick destroy partial shared/header'.dim}
${' – service'.yellow}
${'   kick destroy service Auth'.dim}
${' – state'.yellow}
${'   kick destroy model User'.dim}
${' – state'.yellow}
${'   kick destroy state users'.dim}
${' – style'.yellow}
${'   kick destroy style buttons'.dim}
${' – config'.yellow}
${'   kick destroy config buttons'.dim}
${' – environment'.yellow}
${'   kick destroy environment staging'.dim}`)
}

function setup() {
  Logger.log(`${message.help.definition('setup', 'set')}
${'Runs npm install'}.white`);
}

function start() {
  Logger.log(`${message.help.definition('start', 's')}
${'Runs webpack-dev-server with autoreload'.white}`);
}

function bundle() {
  Logger.log(`${message.help.definition('bundle|build', 'b')}
${'Will concat, minify, uglify and other preparations to files and output the ready-to-use application in /dist folder'}.white`);
}

function test() {
  Logger.log(message.help.definition('test', 't'));
  Logger.log('Single-pass tests with Karma'.white);
}

function lint() {
  Logger.log(message.help.definition('lint'));
  Logger.log('Lint you code using eslint'.white);
}

function upgrade() {
  Logger.log(message.help.definition('upgrade', 'u'));
  Logger.log('Check for new kick version and ask to update'.white);
}

function help() {
  Logger.log(`${'Available commands:'.white}
help          h                       This command
about         a                       Displays useful information about application
new           n      [name]           Creates AngularJS application from template
generate      g      [type] [name]    Generates services, directives, components, filters, partials and states
destroy       d      [type] [name]    Destroys services, directives, components, filters, partials and states
setup         set                     Download node modules
start         s      [env]            Run webpack-dev-server with auto-reload
tdd                  [env]            Run karma watcher
bundle|build  b      [env]            Build application for production
test          t      [env]            Run test suit once
lint                                  Run eslint once
upgrade       u                       Check for new kick version
docs                                  Open documentation in browser
Run                  ${'help [command]'.blue }   for more information`);
}

function docs() {
  Logger.log(`${'Command: ' + 'docs'.blue}
${'Open kick documentation in browser (http://www.angular-kick.com)'}.white`);
}

function karmaDebug() {
  Logger.log(`${'Command: ' + 'karma-debug'.blue}
${'Open karma debugger in browser (http://localhost:9876)'.white}`);
}
