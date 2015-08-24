export function homeRoutes($stateProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: require('states/home/home.html'),
      controller: 'HomeController as Home'
    })
}

homeRoutes.$inject = ['$stateProvider'];