var karma       = require('karma').server;

module.exports = function (done) {
  return karma.start({
    configFile: __dirname + '/../../karma.conf.js',
    singleRun: false
  }, done);
};