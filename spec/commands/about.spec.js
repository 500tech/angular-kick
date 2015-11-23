'use strict';

require('app-module-path').addPath(__dirname + '/../../');

const TestHelpers   = require('spec/support/helpers');
const child_process = require('child_process');
const kick          = 'node ' + __dirname + '/../../bin/kick ';

describe('$ kick about', () => {

  beforeAll(TestHelpers.createApp);
  afterAll(TestHelpers.cleanup);

  it('should output information about application', () => {
    const output = child_process.execSync(kick + 'about').toString();

    expect(output).toMatch("NpmTest");
    expect(output).toMatch("1.0.0");
    expect(output).toMatch("1.4.8");
  });
});
