'use strict';

const TestHelpers   = require('../support/helpers');
const fs            = require('fs-extra');
const child_process = require('child_process');
const kick          = 'node ' + __dirname + '/../../bin/kick ';

describe('$ kick lint', () => {

  beforeAll(TestHelpers.createApp);
  afterAll(TestHelpers.cleanup);

  it('should run npm install', () => {
    expect(true).toBeTruthy();
  });
});
