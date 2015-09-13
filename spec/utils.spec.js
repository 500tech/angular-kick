var child_process = require('child_process');
var utils         = require('../lib/utils');
var logger        = require('../lib/logger');

describe('utils module', function () {

  beforeEach(function () {
    spyOn(child_process, 'execSync');
    spyOn(logger, 'log');
    spyOn(logger, 'warn');
  });

  it('should log a message to the console', function () {
    utils.ensureGlobalModule('webpack');
    expect(logger.log).toHaveBeenCalledWith('Checking for webpack presence...');
  });

  it('should try to run the provided module "-v" command', function () {
    utils.ensureGlobalModule('webpack');
    expect(child_process.execSync).toHaveBeenCalledWith('webpack -v');
  });

});
