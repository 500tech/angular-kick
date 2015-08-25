var helpers       = require('../support/helpers');
var fs            = require('fs-extra');
var child_process = require('child_process');
var kick          = 'node ' + __dirname + '/../../bin/kick ';

describe('$ kick bundle', function () {

  beforeAll(helpers.createApp);
  afterAll(helpers.cleanup);

  it('should not run without packages', function () {
    var output = child_process.execSync(kick + 'bundle').toString();

    expect(output).toMatch("Can't start server with missing packages");
  });

  it('should run npm bundle task', function () {
    fs.ensureDirSync('node_modules');
    var output = child_process.execSync(kick + 'bundle', { timeout: 5000 }).toString();

    expect(output).toMatch("Building application");
  });
});
