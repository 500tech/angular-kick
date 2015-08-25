var helpers       = require('../support/helpers');
var child_process = require('child_process');
var kick          = 'node ' + __dirname + '/../../bin/kick ';

describe('$ kick help', function () {

  beforeAll(helpers.createApp);
  afterAll(helpers.cleanup);

  it('should output help', function () {
    var output = child_process.execSync(kick + 'help').toString();

    expect(output).toMatch("Available commands");
  });
});
