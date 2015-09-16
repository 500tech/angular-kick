var helpers       = require('../support/helpers');
var fs            = require('fs-extra');
var child_process = require('child_process');
var kick          = 'node ' + __dirname + '/../../bin/kick ';

describe('$ kick new', function () {
  it('should create new application without setup', function () {
    fs.removeSync('npm_test');
    child_process.execSync(kick + 'new npmTest -ns');
    process.chdir('npm_test');
    var file = helpers.getFile('package.json');

    expect(file).toMatch('"name": "NpmTest"');
  });

  afterAll(helpers.cleanup);
});
