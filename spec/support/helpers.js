'use strict';

const path          = require('path');
const fs            = require('fs-extra');
const child_process = require('child_process');
const kick          = 'node ' + __dirname + '/../../bin/kick ';

module.exports = class TestHelpers {

  static getAppPath() {
    return path.resolve('./npm-test');
  }

  static createApp() {
    TestHelpers.cleanup();
    child_process.execSync(kick + 'new npmTest -ns');
    process.chdir(TestHelpers.getAppPath());
  }

  static cleanup() {
    fs.removeSync(TestHelpers.getAppPath());
  }

  static getFile(filename) {
    return fs.readFileSync(filename).toString();
  }

};
