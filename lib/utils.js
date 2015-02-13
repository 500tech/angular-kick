var fs     = require('fs-extra');
var logger = require('./logger');

module.exports = {
  isEmptyDir: function (path) {
    var files = fs.readdirSync(path);
    return !files.length;
  },

  ensurePackagesExist: function () {
    if (!fs.existsSync('node_modules') || !fs.existsSync('bower_components')) {
      logger.warn("Can't start server with missing packages".yellow);
      console.log('Please run '.white + 'kick setup'.blue + ' first'.white);
      process.exit(0);
    }
  }
};