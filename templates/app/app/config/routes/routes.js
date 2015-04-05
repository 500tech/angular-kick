import { homeRoutes } from './home';
import { staticRoutes } from './static';

angular.module('%APP_NAME%.routes', ['ui.router'])
  .config(homeRoutes)
  .config(staticRoutes);