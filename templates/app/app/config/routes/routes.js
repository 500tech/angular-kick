import 'ui-router';

import { homeRoutes } from './home';
import { staticRoutes } from './static';

export default angular.module('%APP_NAME%.routes', ['ui.router'])
  .config(($urlRouterProvider) => $urlRouterProvider.otherwise('/404'))
  .config(homeRoutes)
  .config(staticRoutes);