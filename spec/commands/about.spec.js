var helpers       = require('../support/helpers');
var child_process = require('child_process');
var kick          = 'node ' + __dirname + '/../../bin/kick ';

describe('$ kick about', function () {

  beforeAll(helpers.createApp);
  afterAll(helpers.cleanup);

  it('should output information about application', function () {
    var output = child_process.execSync(kick + 'about').toString();

    expect(output).toMatch("NpmTest");
    expect(output).toMatch("1.0.0");
    expect(output).toMatch("1.4.3");
  });
});
