angular.module('%APP_NAME%.config').config(function ($stateProvider) {
  $stateProvider
    .state('static', {
      abstract: true
    })

    .state('static.404', {
      url: '/404',
      templateUrl: 'states/static/404.html'
    })
});