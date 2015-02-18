var child_process = require('child_process');
var kick          = 'node ' + __dirname + '/../../bin/kick ';

describe('$ kick unknown', function () {
  it('should warn about unrecognized command', function () {
    var process = child_process.execSync(kick + 'unknown');
    expect(process).toMatch("kick didn't recognize");
  });
});
