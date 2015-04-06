var karma       = require('karma').server;

module.exports = function (done) {
  global.karmaBaseDirectory = '.tmp';
  return karma.start({
    configFile: __dirname + '/../../karma.conf.js',
    singleRun: false
  }, done);
};