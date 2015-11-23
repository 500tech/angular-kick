'use strict';

const Logger = require('../lib/logger');
const Utils  = require('../lib/utils');
const which  = require('which');

const child_process = require('child_process');

describe('utils module', () => {

  beforeEach(() => {
    spyOn(child_process, 'execSync');
    spyOn(Logger, 'log');
    spyOn(Logger, 'warn');
  });

  it('should log a message to the console', () => {
    Utils.ensureGlobalModule('webpack');
    expect(Logger.log).toHaveBeenCalledWith('Checking for webpack presence...');
  });

  it('should check if provided module is installed with which command', () => {
    spyOn(which, 'sync');

    Utils.ensureGlobalModule('webpack');
    expect(which.sync).toHaveBeenCalledWith('webpack');
  });

});
