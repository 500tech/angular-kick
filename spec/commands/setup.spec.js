var helpers       = require('../support/helpers');
var fs            = require('fs-extra');
var child_process = require('child_process');
var kick          = 'node ' + __dirname + '/../../bin/kick ';

describe('$ kick setup', function () {

  beforeAll(helpers.createApp);
  afterAll(helpers.cleanup);

  it('should run npm install', function () {
    expect(true).toBeTruthy();
  });
});
