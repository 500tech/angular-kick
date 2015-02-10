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
      destroy.service(name);
      if (args.length) {
        args.forEach(function (otherName) { destroy.service(otherName); });
      }
      logger.done();
      break;
    case 'model':
      destroy.model(name);
      if (args.length) {
        args.forEach(function (otherName) { destroy.model(otherName); });
      }
      logger.done();
      break;
    case 'directive':
      destroy.directive(name);
      if (args.length) {
        args.forEach(function (otherName) { destroy.directive(otherName); });
      }
      logger.done();
      break;
    case 'filter':
      destroy.filter(name);
      if (args.length) {
        args.forEach(function (otherName) { destroy.filter(otherName); });
      }
      logger.done();
      break;
    case 'state':
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
      break;
    case 'partial':
      destroy.partial(name);
      if (args.length) {
        args.forEach(function (otherName) { destroy.partial(otherName); });
      }
      logger.done();
      break;
    case 'style':
      destroy.style(name);
      if (args.length) {
        args.forEach(function (otherName) { destroy.style(otherName); });
      }
      logger.done();
      break;
    case 'config':
      destroy.config(name);
      if (args.length) {
        args.forEach(function (otherName) { destroy.config(otherName); });
      }
      logger.done();
      break;
    case 'environment':
      destroy.environment(name);
      if (args.length) {
        args.forEach(function (otherName) { destroy.environment(otherName); });
      }
      logger.done();
      break;
    default:
      logger.warn('What do you want to destroy?');
      console.log('  Run ' + 'kick help destroy'.blue + ' to see all available options');
  }
};
