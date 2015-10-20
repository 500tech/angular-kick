'use strict';

const fs            = require('fs-extra');
const child_process = require('child_process');
const kick          = 'node ' + __dirname + '/../../bin/kick ';

module.exports = class TestHelpers {

  static createApp() {
    fs.removeSync('npm-test');
    child_process.execSync(kick + 'new npmTest -ns');
    process.chdir('npm-test');
  }

  static cleanup() {
    process.chdir('..');
    fs.removeSync('npm-test');
  }

  static getFile(filename) {
    return fs.readFileSync(filename).toString();
  }

};
