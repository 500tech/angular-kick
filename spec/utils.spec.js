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
    utils.ensureGlobalModule('bower');
    expect(logger.log).toHaveBeenCalledWith('Checking for bower presence...');
  });

  it('should delegate to a "which" command with child process', function () {
    utils.ensureGlobalModule('bower');
    expect(child_process.execSync).toHaveBeenCalledWith('which bower');
  });

});
