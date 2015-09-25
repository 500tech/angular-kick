import { Inject } from 'decorators/inject';

@Inject('$stateProvider')
export function homeRoutes($stateProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: require('states/home/home.html'),
      controller: 'HomeController',
      controllerAs: 'Home'
    })
}
