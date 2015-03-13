"use strict";

require('angular');
require('angular-ui-router');

require('./modules');

angular.module('%APP_NAME%', [
  '%APP_NAME%.config',
  '%APP_NAME%.services',
  '%APP_NAME%.filters',
  '%APP_NAME%.directives',
  '%APP_NAME%.controllers',
  '%APP_NAME%.templates'
]);

angular.module('%APP_NAME%').run(function ($rootScope, $state) {
});

require('./models/models');
require('./services/services');
require('./directives/directives');
require('./filters/filters');
require('./config/config');
require('./states/states');
require('./templates');
