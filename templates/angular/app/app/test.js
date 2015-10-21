/* global __dirname */

require('angular');
require('angular-mocks');
require('app');

const context = require.context(
  __dirname + '/../test',
  true,
  /\.spec\./
);

context.keys().forEach(context);
