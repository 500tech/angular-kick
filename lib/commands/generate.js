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
      service(name, args);
      break;
    case 'model':
      model(name, args);
      break;
    case 'directive':
      directive(name, args, opts);
      break;
    case 'filter':
      filter(name, args);
      break;
    case 'state':
      state(name, args, opts);
      break;
    case 'partial':
      partial(name, args, opts);
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
      logger.warn('What do you want to generate?');
      console.log('  Run ' + 'kick help generate'.blue + ' to see all available options');
  }
};

function service(name, args) {
  generate.service(name);
  if (args.length) {
    args.forEach(function (otherName) { generate.service(otherName); });
  }
  logger.done();
}

function model(name, args) {
  generate.model(name);
  if (args.length) {
    args.forEach(function (otherName) { generate.model(otherName); });
  }
  logger.done();
}

function directive(name, args, opts) {
  var template = (opts.template || opts.t);
  generate.directive(name, template);
  if (args.length) {
    args.forEach(function (otherName) { generate.directive(otherName, template); });
  }
  logger.done();
}

function filter(name, args) {
  generate.filter(name);
  if (args.length) {
    args.forEach(function (otherName) { generate.filter(otherName); });
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

function style(name, args) {
  generate.style(name);
  if (args.length) {
    args.forEach(function (otherName) { generate.style(otherName); });
  }
  logger.done();
}

function config(name, args) {
  generate.config(name);
  if (args.length) {
    args.forEach(function (otherName) { generate.config(otherName); });
  }
  logger.done();
}

function environment(name, args) {
  generate.environment(name);
  if (args.length) {
    args.forEach(function (otherName) { generate.environment(otherName); });
  }
  logger.done();
}