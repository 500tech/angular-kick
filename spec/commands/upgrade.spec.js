var fs            = require('fs-extra');
var kick          = __dirname + '/../../bin/kick ';
var child_process = require('child_process');

describe('$ kick upgrade', function () {
  it('SETUP', function () {
    fs.deleteSync('npm_test');
    child_process.execSync(kick + 'new npmTest -ns');
    process.chdir('npm_test');
  });

  it('should check for updates', function () {
    var output = child_process.execSync(kick + 'upgrade').toString();

    expect(output).toMatch("Checking for updates")
  });

  it('TEARDOWN', function () {
    process.chdir('..');
    fs.deleteSync('npm_test');
  });
});
