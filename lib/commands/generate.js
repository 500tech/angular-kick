"use strict";

var generate  = require('../generators/generators');
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
    case 'srv':
      generateType('service', name, args);
      break;
    case 'model':
    case 'm':
      generateType('model', name, args);
      break;
    case 'directive':
    case 'drv':
      directive(name, args, opts);
      break;
    case 'filter':
    case 'f':
      generateType('filter', name, args);
      break;
    case 'state':
    case 's':
      state(name, args, opts);
      break;
    case 'partial':
    case 'p':
      partial(name, args, opts);
      break;
    case 'style':
      generateType('style', name, args);
      break;
    case 'config':
    case 'cfg':
      generateType('config', name, args);
      break;
    case 'environment':
    case 'env':
      generateType('environment', name, args);
      break;
    default:
      logger.warn('What do you want to generate?');
      logger.log('  Run ' + 'kick help generate'.blue + ' to see all available options');
  }
};

function directive(name, args, opts) {
  var template = (opts.template || opts.t);
  generate.directive(name, template);
  if (args.length) {
    args.forEach(function (otherName) { generate.directive(otherName, template); });
  }
  logger.done();
}

function state(name, args, opts) {
  var noController = (opts.noController || opts.nc || opts.anc || opts.nca);
  var abstract = (opts.abstract || opts.a || opts.anc || opts.nca);
  generate.state(name, noController, abstract);
  if (args.length) {
    args.forEach(function (substate) {
      if (substate.toLowerCase() === 'crud') {
        ['list', 'new', 'show', 'edit'].forEach(function (action) {
          generate.state(name + '/' + action, null, null);
        });
      } else {
        generate.state(name + '/' + substate, null, null);
      }
    });
  }
  logger.done();
}

function partial(name, args, opts) {
  var controller = (opts.controller || opts.c);
  generate.partial(name, controller);
  if (args.length) {
    args.forEach(function (otherName) { generate.partial(otherName, controller); });
  }
  logger.done();
}

function generateType(type, name, args) {
  generate[type](name);
  if (args.length) {
    args.forEach(function (otherName) { generate[type](otherName); });
  }
  logger.done();
}
