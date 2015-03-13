require('./constants');
require('./decorators');
require('./interceptors');
require('./routes/routes');

angular.module('%APP_NAME%.config')
  .config(function ($compileProvider, $httpProvider, $locationProvider, $logProvider, ENV) {

    if (ENV === 'production') {
      // Enable for performance boost on production
      $compileProvider.debugInfoEnabled(false);

      // Disable console.log outputs for production
      $logProvider.debugEnabled(false);
    }

    // Combine close $http calls together and run $digest once
    $httpProvider.useApplyAsync(true);

    // Allows to access application URLs without the # sign
    $locationProvider.html5Mode(true);
  });
