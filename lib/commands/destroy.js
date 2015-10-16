"use strict";

const Logger  = require('../logger');
const destroy = require('../destroyers/destroyers');
const message = require('../messages');

module.exports = function () {
  const type = process.argv[3];
  const name = process.argv[4];

  process.argv.splice(0,5);
  let args = process.argv;

  // Move all option names (with - or -- prefix) to opts,
  // and leave the rest of the arguments on args
  args = args.filter( arg => {
    if (!arg.match(/^-/) && !arg.match(/^--/)) {
      return arg;
    }
  });

  switch (type) {
    case 'service':
    case 'srv':
      destroyType('service', name, args);
      break;
    case 'model':
    case 'm':
      destroyType('model', name, args);
      break;
    case 'directive':
    case 'drv':
      destroyType('directive', name, args);
      break;
    case 'component':
    case 'cmp':
      destroyType('component', name, args);
      break;
    case 'filter':
    case 'f':
      destroyType('filter', name, args);
      break;
    case 'state':
    case 's':
      state(name, args);
      break;
    case 'partial':
    case 'p':
      destroyType('partial', name, args);
      break;
    case 'style':
      destroyType('style', name, args);
      break;
    case 'config':
    case 'cfg':
      destroyType('config', name, args);
      break;
    case 'environment':
    case 'env':
      destroyType('environment', name, args);
      break;
    default:
      Logger.warn(message.destroy.whatToDestroy);
      Logger.log(message.destroy.help);
  }
};

function state(name, args) {
  destroy.state(name);
  args.map( substate => {
    if (substate.toLowerCase() === 'crud') {
      ['list', 'new', 'show', 'edit'].forEach( action => {
        destroy.state(name + '/' + action);
      });
    } else {
      destroy.state(name + '/' + substate);
    }
  });
  Logger.done();
}

function destroyType(type, name, args) {
  destroy[type](name);
  args.map((otherName) => destroy[type](otherName));
  Logger.done();
}
