'use strict';

const Logger = require('../lib/logger');
const Utils  = require('../lib/utils');

var child_process = require('child_process');

describe('utils module', function () {

  beforeEach(function () {
    spyOn(child_process, 'execSync');
    spyOn(Logger, 'log');
    spyOn(Logger, 'warn');
  });

  it('should log a message to the console', function () {
    Utils.ensureGlobalModule('webpack');
    expect(Logger.log).toHaveBeenCalledWith('Checking for webpack presence...');
  });

  it('should check if provided module is installed with which command', function () {
    Utils.ensureGlobalModule('webpack');
    expect(child_process.execSync).toHaveBeenCalledWith('which webpack');
  });

});
