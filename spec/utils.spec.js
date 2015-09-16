'use strict';

const Logger = require('../lib/logger');

var child_process = require('child_process');
var utils         = require('../lib/utils');

describe('utils module', function () {

  beforeEach(function () {
    spyOn(child_process, 'execSync');
    spyOn(Logger, 'log');
    spyOn(Logger, 'warn');
  });

  it('should log a message to the console', function () {
    utils.ensureGlobalModule('webpack');
    expect(Logger.log).toHaveBeenCalledWith('Checking for webpack presence...');
  });

  it('should check if provided module is installed with which command', function () {
    utils.ensureGlobalModule('webpack');
    expect(child_process.execSync).toHaveBeenCalledWith('which webpack');
  });

});
