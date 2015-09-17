"use strict";

import 'sugar';
import 'angular';

import 'assets/stylesheets/application.scss';

import Models from 'models/models';
import Services from 'services/services';
import Directives from 'directives/directives';
import Filters from 'filters/filters';
import Config from 'config/config';
import Routes from 'config/routes/routes';
import States from 'states/states';

angular.module('%APP_NAME%', [
  Models.name,
  Services.name,
  Directives.name,
  Filters.name,
  Config.name,
  Routes.name,
  States.name,
]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['%APP_NAME%']);
});
