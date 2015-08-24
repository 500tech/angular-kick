import notFoundTemplate from 'states/static/404.html';

export function staticRoutes($stateProvider) {
  $stateProvider
    .state('static', {
      template: '<ui-view></ui-view>',
      abstract: true
    })

    .state('static.404', {
      url: '/404',
      templateUrl: notFoundTemplate
    })
}

staticRoutes.$inject = ['$stateProvider'];