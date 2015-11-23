'use strict';

const commands = require('../../lib/commands/commands');
const Utils    = require('../../lib/utils');
const Logger   = require('../../lib/logger');
const message  = require('../../lib/messages');

describe('$ kick bundle', () => {

  beforeEach(() => {
    spyOn(Utils, 'spawnProcess').and.callFake(() => ({ on: () => {} }));
    spyOn(Utils, 'ensurePackagesExist').and.returnValue(true);
    spyOn(Logger, 'log');
  });

  it('should run npm bundle task', () => {
    const command = 'node_modules/.bin/webpack';
    const args    = ['-p', '--progress'];
    const env     = 'production';

    commands.bundle();

    expect(Utils.ensurePackagesExist).toHaveBeenCalled();
    expect(Utils.spawnProcess).toHaveBeenCalledWith(command, args, env);
    expect(Logger.log).toHaveBeenCalledWith(message.bundle.start);
  });
});
