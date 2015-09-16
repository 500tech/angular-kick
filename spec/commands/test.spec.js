var helpers       = require('../support/helpers');
var fs            = require('fs-extra');
var child_process = require('child_process');
var kick          = 'node ' + __dirname + '/../../bin/kick ';

describe('$ kick test', function () {

  beforeAll(helpers.createApp);
  afterAll(helpers.cleanup);

  it('should not run without packages', function () {
    var output = child_process.execSync(kick + 'test').toString();
    expect(output).toMatch("Can't start server with missing packages")
  });

  it('should run npm test', function () {
    fs.ensureDirSync('node_modules');
    var output = child_process.execSync(kick + 'test');

    expect(output.toString()).toMatch("Starting tests...");
  });
});
