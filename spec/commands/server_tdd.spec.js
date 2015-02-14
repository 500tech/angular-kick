var fs            = require('fs-extra');
var child_process = require('child_process');
var kick          = __dirname + '/../../bin/kick ';

describe('$ kick server:tdd', function () {

  it('SETUP', function () {
    fs.deleteSync('npm_test');
    child_process.execSync(kick + 'new npmTest -ns');
    process.chdir('npm_test');
  });

  it('should not run without packages', function () {
    var output = child_process.execSync(kick + 'server:tdd').toString();

    expect(output).toMatch("Can't start server with missing packages")
  });

  it('should run gulp server:tdd task', function () {
    fs.ensureDirSync('node_modules');
    fs.ensureDirSync('bower_components');
    var output = child_process.execSync(kick + 'server:tdd').toString();

    expect(output).toMatch("Running browserSync server");
    expect(output).toMatch("Running Karma test server");
  });

  it('TEARDOWN', function () {
    process.chdir('..');
    fs.deleteSync('npm_test');
  });
});
