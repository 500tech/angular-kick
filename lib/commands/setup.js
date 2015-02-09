"use strict";

var fs        = require('fs-extra');
var spawn     = require('child_process').spawn;
var getSize   = require('get-folder-size');
var Progress  = require('progress');
var logger    = require('../logger');

module.exports = function () {
  fs.deleteSync('node_modules');
  fs.deleteSync('bower_components');
  console.log('Downloading packages (approx. 170MB), this usually takes 5–7 minutes...'.white);

  var lastChunk = 0;
  var progress = new Progress(':bar :percent :elapseds'.white, {
    complete: '▉'.green,
    incomplete: '▉'.dim,
    width: 50,
    total: 173220146
  });
  var npmProcess = spawn('npm', ['install']);

  npmProcess.stdout.on('data', function (data) {
    getSize('node_modules', function (err, size) {
      var chunk = size - lastChunk;
      progress.tick(chunk);
      lastChunk += chunk;
    });
  });

  npmProcess.stderr.on('data', function (data) {
    getSize('node_modules', function (err, size) {
      var chunk = size - lastChunk;
      progress.tick(chunk);
      lastChunk += chunk;
    });
  });

  npmProcess.on('exit', function () {
    var bowerProcess = spawn('bower', ['install']);

    getSize('node_modules', function (err, size) {
      progress.tick(size);
    });

    bowerProcess.stdout.on('data', function (data) {
      getSize('bower_components', function (err, size) {
        var chunk = size - lastChunk;
        progress.tick(chunk);
        lastChunk += chunk;
      });
    });

    bowerProcess.stderr.on('data', function (data) {
      console.log(('' + data).replace(/\n/, ''));
    });

    bowerProcess.on('exit', function (code) {
      console.log('');
      logger.done();
    });
  });

};