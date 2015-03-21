var gulp = require('gulp');
var spawn = require('child_process').spawn;
var common = require('../common');

module.exports = function () {
  var sources = common.sources;
  var gulpProcess;

  function restart() {
    var task;
    var env = process.argv[3];

    if (process.argv[2]) {
      task = process.argv[2].replace(/^--/, '');
    } else {
      task = 'dev:server';
    }

    var args = [task];
    if (env) { args.push(env); }

    if (gulpProcess) { gulpProcess.kill(); }
    gulpProcess = spawn('gulp', args, {stdio: 'inherit'});
  }

  function notifyAndRestart() {
    console.log('');
    console.log('   Gulp was changed, restarting...');
    console.log('');
    restart();
  }

  gulp.watch(sources.gulp, notifyAndRestart);
  restart();
};