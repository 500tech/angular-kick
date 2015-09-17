"use strict";

const Logger   = require('../logger');
const generate = require('../generators/generators');
const message  = require('../messages');
const format   = require('change-case');

module.exports = function () {
  const type = process.argv[3];
  const name = process.argv[4];

  process.argv.splice(0,5);
  let args = process.argv;
  const opts = {};

  // Move all option names (with - or -- prefix) to opts,
  // and leave the rest of the arguments on args
  args = args.filter( arg => {
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
      Logger.warn(message.generate.whatToGenerate);
      Logger.log(message.generate.help);
  }
};

function directive(name, args, opts) {
  const template = (opts.template || opts.t);
  generate.directive(name, template);
  args.map( otherName => generate.directive(otherName, template));
  Logger.done();
}

function state(name, args, opts) {
  const noController = (opts.noController || opts.nc || opts.anc || opts.nca);
  const abstract     = (opts.abstract || opts.a || opts.anc || opts.nca);

  generate.state(name, noController, abstract);

  args.map( substate =>{
    if (substate.toLowerCase() === 'crud') {
      ['list', 'new', 'show', 'edit'].forEach( action => {
        generate.state(name + '/' + action, null, null);
      });
    } else {
      generate.state(name + '/' + substate, null, null);
    }
  });
  Logger.done();
}

function partial(name, args, opts) {
  const controller = (opts.controller || opts.c);
  generate.partial(name, controller);

  args.map((otherName) => generate.partial(otherName, controller));
  Logger.done();
}

function generateType(type, name, args) {
  generate[type](name);
  args.map((otherName) => generate[type](otherName));
  Logger.done();
}
