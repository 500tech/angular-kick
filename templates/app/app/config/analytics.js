angular.module('%APP_NAME%.config')
  .config(function ($analyticsProvider) {
    $analyticsProvider.firstPageview(false);
    $analyticsProvider.virtualPageviews(false);
  });
