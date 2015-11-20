'use strict';

const changeCase  = require('change-case');

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

  static toComponentName(name) {
    return changeCase.camel(name)
      .replace(/Component$/, '')
      .replace(/Cmp$/, '');
  }

  static toComponentTagName(name) {
    return changeCase.param(Format.toComponentName(name));
  }

  static toFilterName(name) {
    return changeCase.camel(name)
      .replace(/Filter$/, '');
  }

  static toFolderName(name) {
    return changeCase.param(name);
  }

  static toStateName(name) {
    return changeCase.camel(name);
  }

  static toJSFileName(name) {
    const filename = changeCase.param(name)
      .replace('-controller', '')
      .replace('-directive', '')
      .replace('-service', '')
      .replace('-filter', '')
      .replace('-model', '')
      .replace('-spec', '.spec');

    return `${filename}.js`;
  }

  static toHTMLFileName(name) {
    return `${ changeCase.param(name) }.html`;
  }

  static toSCSSFileName(name) {
    return `${ changeCase.param(name) }.scss`;
  }

  static toPartialName(name) {
    return `_${ changeCase.param(name) }.html`;
  }

  static toPartialControllerName(name) {
    return `_${ changeCase.param(name) }.js`;
  }

  static toPartialControllerSpecName(name) {
    return `_${ changeCase.param(name) }.spec.js`;
  }

  static parentPath(parents) {
    parents = parents.map((parent) => Format.toFolderName(parent)).join('/');

    if (parents) { parents += '/'; }

    return parents;
  }

  static parentState(parents) {
    return parents.map((parent) => Format.toFolderName(parent)).join('.');
  }
};
