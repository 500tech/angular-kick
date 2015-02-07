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
      generate.service(name);
      if (args.length) {
        args.forEach(function (otherName) { generate.service(otherName); });
      }
      logger.done();
      break;
    case 'directive':
      var template = (opts.template || opts.t);
      generate.directive(name, template);
      if (args.length) {
        args.forEach(function (otherName) { generate.directive(otherName, template); });
      }
      logger.done();
      break;
    case 'filter':
      generate.filter(name);
      if (args.length) {
        args.forEach(function (otherName) { generate.filter(otherName); });
      }
      logger.done();
      break;
    case 'state':
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
      break;
    case 'partial':
      var controller = (opts.controller || opts.c);
      generate.partial(name, controller);
      if (args.length) {
        args.forEach(function (otherName) { generate.partial(otherName, controller); });
      }
      logger.done();
      break;
    case 'style':
      generate.style(name);
      if (args.length) {
        args.forEach(function (otherName) { generate.style(otherName); });
      }
      logger.done();
      break;
    case 'config':
      generate.config(name);
      if (args.length) {
        args.forEach(function (otherName) { generate.config(otherName); });
      }
      logger.done();
      break;
    default:
      logger.warn('What do you want to generate?');
      console.log('  Run ' + 'kick help generate'.blue + ' to see all available options');
  }
};