"use strict";

const Logger = require('./logger');

var changeCase  = require('change-case');
var prompt      = require('readline-sync').question;

var formatters = {
  toControllerName: function (name) {
    name = changeCase.pascal(name);
    name = name.replace(/Ctrl$/, 'Controller');
    if (!name.match(/Controller$/)) {
      name = name + 'Controller';
    }
    return name;
  },

  toControllerVarName: function (name) {
    return changeCase.camel(formatters.toControllerName(name));
  },

  toConstName: function (name) {
    return changeCase.pascal(name);
  },

  toServiceName: function (name) {
    return changeCase.pascal(name)
      .replace(/Service$/, '')
      .replace(/Srv$/, '')
      .replace(/Provider$/, '')
      .replace(/Factory$/, '');
  },

  toDirectiveName: function (name) {
    return changeCase.camel(name)
      .replace(/Directive$/, '')
      .replace(/Drv$/, '');
  },

  toDirectiveTagName: function (name) {
    return changeCase.param(formatters.toDirectiveName(name));
  },

  toFilterName: function (name) {
    return changeCase.camel(name)
      .replace(/Filter$/, '');
  },

  toFolderName: function (name) {
    return changeCase.snake(name);
  },

  toJSFileName: function (name) {
    var filename = changeCase.snake(name)
      .replace('_controller', '')
      .replace('_directive', '')
      .replace('_service', '')
      .replace('_filter', '')
      .replace('_model', '')
      .replace('_spec', '.spec');
    return '' + filename + '.js';
  },

  toHTMLFileName: function (name) {
    return '' + changeCase.snake(name) + '.html';
  },

  toSCSSFileName: function (name) {
    return '' + changeCase.snake(name) + '.scss';
  },

  toPartialName: function (name) {
    return '_' + changeCase.snake(name) + '.html';
  },

  toPartialControllerName: function (name) {
    return '_' + changeCase.snake(name) + '.js';
  },

  toPartialControllerSpecName: function (name) {
    return '_' + changeCase.snake(name) + '.spec.js';
  },

  parentPath: function (parents) {
    var self = this;
    parents = parents.map(
      function (parent) { return self.toFolderName(parent); }
    ).join('/');
    if (parents) { parents += '/'; }
    return parents;
  },

  parentState: function (parents) {
    var self = this;
    parents = parents.map(
      function (parent) { return self.toFolderName(parent); }
    ).join('.');
    return parents;
  },

  checkName: function (type, name) {
    if (!name) {
      Logger.log(('Please specify a name for your '+ type).white);
      name = prompt('No'.red + ' or ' + 'N'.red + ' to cancel: ');
    }

    if (name.match(/^[^a-zA-Z]/) || name.match(/[^-_a-zA-Z0-9/]/)) {
      Logger.log('Names should start with a character and contain only characters, digits, dashes or underscores'.yellow);
      Logger.log(('Please specify another name for your '+ type).white);
      name = prompt('No'.red + ' or ' + 'N'.red + ' to cancel: ');
    }

    if (name.match(/^[^a-zA-Z]/) || name.match(/[^-_a-zA-Z0-9/]/)) {
      Logger.warn("You can't use '" + name.blue + ("' as a " + type + " name.").yellow);
      process.exit(1);
    }

    switch (name.toLowerCase()) {
      case '':
      case 'no':
      case 'n':
      case 'cancel':
        Logger.warn('Any ' + type + ' should have a name');
        process.exit(1);
        break;
    }

    return name;
  }
};

module.exports = formatters;
