describe('$ kick unknown', function () {
  it('should warn about unrecognized command', function (done) {
    var spawn = require('child_process').spawn;
    var process = spawn('kick', ['unknown']);

    process.stdout.on('data', function (output) {
      expect(output.toString()).toMatch("kick didn't recognize");
      done();
    });
  });
});
