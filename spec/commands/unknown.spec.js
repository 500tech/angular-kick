'use strict';

const child_process = require('child_process');
const kick          = 'node ' + __dirname + '/../../bin/kick ';

describe('$ kick unknown', () => {
  it('should warn about unrecognized command', () => {
    const process = child_process.execSync(kick + 'unknown');
    const output  = child_process.execSync(kick + 'help').toString();

    expect(process.toString()).toBe(output);
  });
});
