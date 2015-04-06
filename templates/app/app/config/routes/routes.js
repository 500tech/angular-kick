import { homeRoutes } from './home';
import { staticRoutes } from './static';

export default angular.module('%APP_NAME%.routes', ['ui.router'])
  .config(homeRoutes)
  .config(staticRoutes);