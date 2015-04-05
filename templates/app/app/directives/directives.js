import { ifEnv } from './if_env';
import { layout } from './layout';

angular.module('%APP_NAME%.directives', [])
  .directive('ifEnv', ifEnv)
  .directive('layout', layout);