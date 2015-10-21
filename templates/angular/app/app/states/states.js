import angular            from 'angular';
import { HomeController } from 'states/home/home';

export default angular.module('%APP_NAME%.controllers', [])
  .controller('HomeController', HomeController);
