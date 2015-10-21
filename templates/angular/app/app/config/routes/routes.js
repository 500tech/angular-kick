import angular from 'angular';
import 'angular-ui-router';

import { homeRoutes } from 'config/routes/home';
import { staticRoutes } from 'config/routes/static';

export default angular.module('%APP_NAME%.routes', ['ui.router'])
  .config(($urlRouterProvider) => $urlRouterProvider.otherwise('/404'))
  .config(homeRoutes)
  .config(staticRoutes);
