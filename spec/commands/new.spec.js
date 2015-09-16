'use strict';

const TestHelpers   = require('../support/helpers');
const fs            = require('fs-extra');
const child_process = require('child_process');
const kick          = 'node ' + __dirname + '/../../bin/kick ';

describe('$ kick new', () => {
  it('should create new application without setup', () => {
    fs.removeSync('npm_test');
    child_process.execSync(kick + 'new npmTest -ns');
    process.chdir('npm_test');
    const file = TestHelpers.getFile('package.json');

    expect(file).toMatch('"name": "NpmTest"');
  });

  afterAll(TestHelpers.cleanup);
});
