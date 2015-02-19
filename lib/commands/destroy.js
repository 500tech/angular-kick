"use strict";

var destroy = require('../destroyers/destroyers');
var logger  = require('../logger');
var message = require('../messages');

module.exports = function () {
  var type = process.argv[3];
  var name = process.argv[4];

  process.argv.splice(0,5);
  var args = process.argv;

  // Move all option names (with - or -- prefix) to opts,
  // and leave the rest of the arguments on args
  args = args.filter(function (arg) {
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
      logger.warn(message.destroy.whatToDestroy);
      logger.log(message.destroy.help);
  }
};

function state(name, args) {
  destroy.state(name);
  if (args.length) {
    args.forEach(function (substate) {
      if (substate.toLowerCase() === 'crud') {
        ['list', 'new', 'show', 'edit'].forEach(function (action) {
          destroy.state(name + '/' + action);
        });
      } else {
        destroy.state(name + '/' + substate);
      }
    });
  }
  logger.done();
}

function destroyType(type, name, args) {
  destroy[type](name);
  if (args.length) {
    args.forEach(function (otherName) { destroy[type](otherName); });
  }
  logger.done();
}
