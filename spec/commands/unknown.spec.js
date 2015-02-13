var child_process = require('child_process');

describe('$ kick unknown', function () {
  it('should warn about unrecognized command', function () {
    var process = child_process.execSync('kick unknown');
    expect(process).toMatch("kick didn't recognize");
  });
});
