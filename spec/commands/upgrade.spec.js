var fs            = require('fs-extra');
var child_process = require('child_process');
var kick          = 'node ' + __dirname + '/../../bin/kick ';

describe('$ kick upgrade', function () {

  beforeAll(function () {
    fs.deleteSync('npm_test');
    child_process.execSync(kick + 'new npmTest -ns');
    process.chdir('npm_test');
  });

  afterAll(function () {
    process.chdir('..');
    fs.deleteSync('npm_test');
  });

  it('should check for updates', function () {
    var output = child_process.execSync(kick + 'upgrade', { timeout: 15000 }).toString();

    expect(output).toMatch("Checking for updates")
  });
});
