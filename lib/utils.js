var fs = require('fs-extra');

module.exports = {
  isEmptyDir: function (path) {
    var files = fs.readdirSync(path);
    return !files.length;
  }
};