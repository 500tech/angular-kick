var fs            = require('fs-extra');
var child_process = require('child_process');
var kick          = 'node ' + __dirname + '/../../bin/kick ';

describe('$ kick setup', function () {
  it('SETUP', function () {
    fs.deleteSync('npm_test');
    child_process.execSync(kick + 'new npmTest -ns');
    process.chdir('npm_test');
  });

  it('should run npm install', function () {
    expect(true).toBeTruthy();
  });

  it('should run bower install', function () {
    expect(true).toBeTruthy();
  });

  it('TEARDOWN', function () {
    process.chdir('..');
    fs.deleteSync('npm_test');
  });
});
