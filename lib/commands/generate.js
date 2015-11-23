'use strict';

const Logger     = require('../logger');
const generate   = require('../generators/generators');
const message    = require('../messages');
const changeCase = require('change-case');

module.exports = function () {
  const type = process.argv[3];
  const name = process.argv[4];

  process.argv.splice(0,5);
  let args = process.argv;
  const opts = {};

  // Move all option names (with - or -- prefix) to opts,
  // and leave the rest of the arguments on args
  args = args.filter((arg) => {
    if (arg.match(/^-/) || arg.match(/^--/)) {
      opts[changeCase.camel(arg.replace(/^--/, '').replace(/^-/, ''))] = true;
    } else {
      return arg;
    }
  });

  switch (type) {
    case 'service':
    case 'srv':
      return generateType('service', name, args, opts);
    case 'model':
    case 'm':
      return generateType('model', name, args, opts);
    case 'directive':
    case 'drv':
      return directive(name, args, opts);
    case 'component':
    case 'cmp':
      return generateType('component', name, args, opts);
    case 'filter':
    case 'f':
      return generateType('filter', name, args, opts);
    case 'state':
    case 's':
      return state(name, args, opts);
    case 'partial':
    case 'p':
      return partial(name, args, opts);
    case 'style':
      return generateType('style', name, args, opts);
    case 'config':
    case 'cfg':
      return generateType('config', name, args, opts);
    case 'environment':
    case 'env':
      return generateType('environment', name, args, opts);
    default:
      Logger.warn(message.generate.whatToGenerate);
      Logger.log(message.generate.help);
  }
};

function directive(name, args, opts) {
  const template = (opts.template || opts.t);

  generate.directive(name, template);
  args.map((otherName) => generate.directive(otherName, template));
  Logger.done();
}

function state(name, args, opts) {
  const noController = (opts.noController || opts.nc || opts.anc || opts.nca);
  const abstract     = (opts.abstract || opts.a || opts.anc || opts.nca);

  generate.state(name, noController, abstract);

  args.map((substate) => {
    if (substate.toLowerCase() === 'crud') {
      ['list', 'new', 'show', 'edit'].forEach((action) => {
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

function generateType(type, name, args, opts) {
  generate[type](name, opts);
  args.map((otherName) => generate[type](otherName, opts));
  Logger.done();
}
