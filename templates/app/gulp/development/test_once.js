var karma       = require('karma').server;

module.exports = function (done) {
  return karma.start({
    configFile: __dirname + '/../../karma-once.conf.js',
    singleRun: true
  }, done);
};