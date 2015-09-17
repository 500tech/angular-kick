'use strict';

const TestHelpers   = require('../support/helpers');
const fs            = require('fs-extra');
const child_process = require('child_process');
const kick          = 'node ' + __dirname + '/../../bin/kick ';

describe('$ kick bundle', () => {

  beforeAll(TestHelpers.createApp);
  afterAll(TestHelpers.cleanup);

  it('should not run without packages', () => {
    const output = child_process.execSync(kick + 'bundle').toString();

    expect(output).toMatch("Can't start server with missing packages");
  });

  it('should run npm bundle task', () => {
    fs.ensureDirSync('node_modules');
    const output = child_process.execSync(kick + 'bundle', { timeout: 5000 }).toString();

    expect(output).toMatch("Building application");
  });
});
