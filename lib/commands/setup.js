"use strict";

var fs        = require('fs-extra');
var spawn     = require('child_process').spawn;
var getSize   = require('get-folder-size');
var Progress  = require('progress');
var logger    = require('../logger');

module.exports = function () {
  fs.deleteSync('node_modules');
  fs.deleteSync('bower_components');
  console.log('Downloading npm packages (approx. 170MB), this usually takes 5–7 minutes...'.white);

  var lastChunk = 0;
  var npmProgress = new Progress(':bar :percent :elapseds'.white, {
    complete: '▉'.green,
    incomplete: '▉'.dim,
    width: 50,
    total: 172149822
  });
  var npmProcess = spawn('npm', ['install']);

  npmProcess.stdout.on('data', function () {
    getSize('node_modules', function (err, size) {
      var chunk = size - lastChunk;
      npmProgress.tick(chunk);
      lastChunk += chunk;
    });
  });

  npmProcess.stderr.on('data', function () {
    getSize('node_modules', function (err, size) {
      var chunk = size - lastChunk;
      npmProgress.tick(chunk);
      lastChunk += chunk;
    });
  });

  npmProcess.on('exit', function () {
    console.log('');
    console.log('');
    console.log('Downloading bower packages (approx. 2MB), this usually takes less than a minute...'.white);

    var lastChunk = 0;
    var bowerProgress = new Progress(':bar :percent :elapseds'.white, {
      complete: '▉'.green,
      incomplete: '▉'.dim,
      width: 50,
      total: 2125023
    });

    var bowerProcess = spawn('bower', ['install']);

    bowerProcess.stdout.on('data', function () {
      getSize('bower_components', function (err, size) {
        var chunk = size - lastChunk;
        bowerProgress.tick(chunk);
        lastChunk += chunk;
      });
    });

    bowerProcess.on('exit', function () {
      console.log('');
      console.log('Hurray! Your app is ready.'.white);
      logger.done();
    });
  });

};