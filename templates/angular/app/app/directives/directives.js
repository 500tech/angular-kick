import angular from 'angular';
import { ifEnv } from 'directives/if-env';

export default angular.module('%APP_NAME%.directives', [])
  .directive('ifEnv', ifEnv);
