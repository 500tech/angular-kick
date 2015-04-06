"use strict";

require('angular');
require('angular-ui-router');

angular.module('%APP_NAME%.templates', []);

import Models from './models/models';
import Services from './services/services';
import Directives from './directives/directives';
import Filters from './filters/filters';
import Config from './config/config';
import Routes from './config/routes/routes';
import States from './states/states';

require('./templates');

angular.module('%APP_NAME%', [
  Models.name,
  Services.name,
  Directives.name,
  Filters.name,
  Config.name,
  Routes.name,
  States.name,
  '%APP_NAME%.templates'
]);

angular.module('%APP_NAME%').run(($rootScope, $state) => {
});