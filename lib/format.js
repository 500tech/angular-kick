"use strict";

const Logger = require('./logger');

const changeCase  = require('change-case');
const prompt      = require('readline-sync').question;

module.exports = class Format {

  static toControllerName(name) {
    name = changeCase.pascal(name);
    name = name.replace(/Ctrl$/, 'Controller');

    if (!name.match(/Controller$/)) {
      name += 'Controller';
    }

    return name;
  }

  static toControllerVarName(name) {
    return changeCase.camel(Format.toControllerName(name));
  }

  static toConstName(name) {
    return changeCase.pascal(name);
  }

  static toServiceName(name) {
    return changeCase.pascal(name)
      .replace(/Service$/, '')
      .replace(/Srv$/, '')
      .replace(/Provider$/, '')
      .replace(/Factory$/, '');
  }

  static toDirectiveName(name) {
    return changeCase.camel(name)
      .replace(/Directive$/, '')
      .replace(/Drv$/, '');
  }

  static toDirectiveTagName(name) {
    return changeCase.param(Format.toDirectiveName(name));
  }

  static toFilterName(name) {
    return changeCase.camel(name)
      .replace(/Filter$/, '');
  }

  static toFolderName(name) {
    return changeCase.snake(name);
  }

  static toJSFileName(name) {
    const filename = changeCase.snake(name)
      .replace('_controller', '')
      .replace('_directive', '')
      .replace('_service', '')
      .replace('_filter', '')
      .replace('_model', '')
      .replace('_spec', '.spec');

    return `${filename}.js`;
  }

  static toHTMLFileName(name) {
    return `${ changeCase.snake(name) }.html`;
  }

  static toSCSSFileName(name) {
    return `${ changeCase.snake(name) }.scss`;
  }

  static toPartialName(name) {
    return `_${ changeCase.snake(name) }.html`;
  }

  static toPartialControllerName(name) {
    return `_${ changeCase.snake(name) }.js`;
  }

  static toPartialControllerSpecName(name) {
    return `_${ changeCase.snake(name) }.spec.js`;
  }

  static parentPath(parents) {
    parents = parents.map((parent) => Format.toFolderName(parent)).join('/');

    if (parents) { parents += '/'; }

    return parents;
  }

  static parentState(parents) {
    return parents.map((parent) => Format.toFolderName(parent)).join('.');
  }

  static checkName(type, name) {
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
        Logger.warn(`Any ${type} should have a name`);
        process.exit(1);
        break;
    }

    return name;
  }
};
