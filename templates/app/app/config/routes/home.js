import homeTemplate from 'states/home/home.html';

export function homeRoutes($stateProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: homeTemplate,
      controller: 'HomeController as Home'
    })
}

homeRoutes.$inject = ['$stateProvider'];