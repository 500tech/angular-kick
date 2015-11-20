'use strict';

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
      return destroyType('service', name, args);
    case 'model':
    case 'm':
      return destroyType('model', name, args);
    case 'directive':
    case 'drv':
      return destroyType('directive', name, args);
    case 'component':
    case 'cmp':
      return destroyType('component', name, args);
    case 'filter':
    case 'f':
      return destroyType('filter', name, args);
    case 'state':
    case 's':
      return state(name, args);
    case 'partial':
    case 'p':
      return destroyType('partial', name, args);
    case 'style':
      return destroyType('style', name, args);
    case 'config':
    case 'cfg':
      return destroyType('config', name, args);
    case 'environment':
    case 'env':
      return destroyType('environment', name, args);
    default:
      Logger.warn(message.destroy.whatToDestroy);
      Logger.log(message.destroy.help);
  }
};

function state(name, args) {
  destroy.state(name);
  args.map((substate) => {
    if (substate.toLowerCase() === 'crud') {
      ['list', 'new', 'show', 'edit'].forEach((action) => {
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
