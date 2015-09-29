"use strict";

import 'sugar';
import 'angular';

import 'assets/stylesheets/application.scss';

import Models     from 'models/models';
import Services   from 'services/services';
import Directives from 'directives/directives';
import Filters    from 'filters/filters';
import Config     from 'config/config';
import Routes     from 'config/routes/routes';
import States     from 'states/states';

// Import all html files to put them in $templateCache
// If you need to use lazy loading, you will probably need
// to remove these two lines and explicitly require htmls
const templates = require.context(__dirname, true, /\.html$/);
templates.keys().forEach(template);

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
