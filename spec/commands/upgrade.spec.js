var helpers       = require('../support/helpers');
var child_process = require('child_process');
var kick          = 'node ' + __dirname + '/../../bin/kick ';

describe('$ kick upgrade', function () {

  beforeAll(helpers.createApp);
  afterAll(helpers.cleanup);

  it('should check for updates', function () {
    var output = child_process.execSync(kick + 'upgrade', { timeout: 15000 }).toString();

    expect(output).toMatch("Checking for updates")
  });
});
