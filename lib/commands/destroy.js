"use strict";

var destroy  = require('../destroyers/destroyers');
var logger    = require('../logger');
var format    = require('change-case');

module.exports = function () {
  var type = process.argv[3];
  var name = process.argv[4];

  process.argv.splice(0,5);
  var args = process.argv;
  var opts = {};

  // Move all option names (with - or -- prefix) to opts,
  // and leave the rest of the arguments on args
  args = args.filter(function (arg) {
    if (arg.match(/^-/) || arg.match(/^--/)) {
      opts[format.camel(arg.replace(/^--/, '').replace(/^-/, ''))] = true;
    } else {
      return arg;
    }
  });

  switch (type) {
    case 'service':
      service(name, args);
      break;
    case 'model':
      model(name, args);
      break;
    case 'directive':
      directive(name, args);
      break;
    case 'filter':
      filter(name, args);
      break;
    case 'state':
      state(name, args);
      break;
    case 'partial':
      partial(name, args);
      break;
    case 'style':
      style(name, args);
      break;
    case 'config':
      config(name, args);
      break;
    case 'environment':
      environment(name, args);
      break;
    default:
      logger.warn('What do you want to destroy?');
      console.log('  Run ' + 'kick help destroy'.blue + ' to see all available options');
  }
};

function service(name, args) {
  destroy.service(name);
  if (args.length) {
    args.forEach(function (otherName) { destroy.service(otherName); });
  }
  logger.done();
}

function model(name, args) {
  destroy.model(name);
  if (args.length) {
    args.forEach(function (otherName) { destroy.model(otherName); });
  }
  logger.done();
}

function directive(name, args) {
  destroy.directive(name);
  if (args.length) {
    args.forEach(function (otherName) { destroy.directive(otherName); });
  }
  logger.done();
}

function filter(name, args) {
  destroy.filter(name);
  if (args.length) {
    args.forEach(function (otherName) { destroy.filter(otherName); });
  }
  logger.done();
}

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

function partial(name, args) {
  destroy.partial(name);
  if (args.length) {
    args.forEach(function (otherName) { destroy.partial(otherName); });
  }
  logger.done();
}

function style(name, args) {
  destroy.style(name);
  if (args.length) {
    args.forEach(function (otherName) { destroy.style(otherName); });
  }
  logger.done();
}

function config(name, args) {
  destroy.config(name);
  if (args.length) {
    args.forEach(function (otherName) { destroy.config(otherName); });
  }
  logger.done();
}

function environment(name, args) {
  destroy.environment(name);
  if (args.length) {
    args.forEach(function (otherName) { destroy.environment(otherName); });
  }
  logger.done();
}