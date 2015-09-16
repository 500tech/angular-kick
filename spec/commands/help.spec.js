'use strict';

const TestHelpers   = require('../support/helpers');
const child_process = require('child_process');
const kick          = 'node ' + __dirname + '/../../bin/kick ';

describe('$ kick help', () => {

  beforeAll(TestHelpers.createApp);
  afterAll(TestHelpers.cleanup);

  it('should output help', () => {
    var output = child_process.execSync(kick + 'help').toString();

    expect(output).toMatch("Available commands");
  });
});
