'use strict';

require('sugar');
require('angular');
require('angular-mocks');

const context = require.context(__dirname + '/../test', true, /\.spec\./);

context.keys().forEach(context);