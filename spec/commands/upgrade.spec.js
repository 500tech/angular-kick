'use strict';

const TestHelpers   = require('../support/helpers');
const child_process = require('child_process');
const kick          = 'node ' + __dirname + '/../../bin/kick ';

describe('$ kick upgrade', () => {

  beforeAll(TestHelpers.createApp);
  afterAll(TestHelpers.cleanup);

  it('should check for updates', () => {
    const output = child_process.execSync(kick + 'upgrade', { timeout: 15000 }).toString();

    expect(output).toMatch("Checking for updates")
  });
});
