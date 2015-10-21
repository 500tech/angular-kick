/* global __dirname, path */

require('angular');
require('angular-mocks');
require('app');

const context = require.context(
  path.join(__dirname,'/../test'),
  true,
  /\.spec\./
);

context.keys().forEach(context);
