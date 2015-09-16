var fs            = require('fs-extra');
var child_process = require('child_process');
var kick          = 'node ' + __dirname + '/../../bin/kick ';

module.exports = {
  createApp: function () {
    fs.removeSync('npm_test');
    child_process.execSync(kick + 'new npmTest -ns');
    process.chdir('npm_test');
  },

  cleanup: function () {
    process.chdir('..');
    fs.removeSync('npm_test');
  },

  getFile: function (filename) {
    return fs.readFileSync(filename).toString();
  }
};