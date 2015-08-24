import { ifEnv } from 'directives/if_env';
import { layout } from 'directives/layout';

export default angular.module('%APP_NAME%.directives', [])
  .directive('ifEnv', ifEnv)
  .directive('layout', layout);