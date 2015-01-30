"use strict";

var spawn   = require('child_process').spawn;
var logger  = require('../logger');

module.exports = function () {
  console.log('Building application to '.white + '/public'.blue + ' folder...'.white);
  var process = spawn('gulp', ['build']);
  var errorFlag;

  process.stdout.on('data', function (data) {
    if (data.toString().match('err')) {
      errorFlag = true;
      console.log(('' + data)
          .replace(/\n/, '')
          .replace('[gulp]', '[gulp]'.green).red
      );
    }
  });

  process.stderr.on('data', function (data) {
    console.log(('' + data.red)
        .replace(/\n/, '')
        .replace('[gulp]', '[gulp]'.red)
    );
  });

  process.on('exit', function () {
    if (!errorFlag) {
      console.log('Feel free to copy it as is.'.white);
      logger.done();
    }
  })
};