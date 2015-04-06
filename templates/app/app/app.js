"use strict";

import 'angular';
import 'angular-ui-router';

import Models from './models/models';
import Services from './services/services';
import Directives from './directives/directives';
import Filters from './filters/filters';
import Config from './config/config';
import Routes from './config/routes/routes';
import States from './states/states';
import Templates from './templates';

angular.module('%APP_NAME%', [
  Models.name,
  Services.name,
  Directives.name,
  Filters.name,
  Config.name,
  Routes.name,
  States.name,
  Templates.name
]);

angular.module('%APP_NAME%').run(($rootScope, $state) => {
});

angular.element(document).ready(function() {
  angular.bootstrap(document, ['%APP_NAME%']);
});