var fs            = require('fs-extra');
var child_process = require('child_process');
var kick          = 'node ' + __dirname + '/../../bin/kick ';

describe('$ kick about', function () {

  beforeAll(function () {
    fs.deleteSync('npm_test');
    child_process.execSync(kick + 'new npmTest -ns');
    process.chdir('npm_test');
  });

  afterAll(function () {
    process.chdir('..');
    fs.deleteSync('npm_test');
  });

  it('should output information about application', function () {
    var output = child_process.execSync(kick + 'about').toString();

    expect(output).toMatch("NpmTest");
    expect(output).toMatch("1.0.0");
    expect(output).toMatch("1.4.3");
  });
});
