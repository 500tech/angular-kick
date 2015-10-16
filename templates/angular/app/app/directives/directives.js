import { ifEnv } from 'directives/if_env';

export default angular.module('%APP_NAME%.directives', [])
  .directive('ifEnv', ifEnv);
