var karma       = require('karma').server;

module.exports = function (done) {
  global.karmaBaseDirectory = '.test';
  return karma.start({
    configFile: __dirname + '/../../karma.conf.js',
    singleRun: true
  }, done);
};