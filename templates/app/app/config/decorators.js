angular.module('%APP_NAME%.config')
  .config(function decorators($provide) {
    $provide.decorator('$exceptionHandler', exceptionHandlerDecorator);
  });

function exceptionHandlerDecorator($delegate, $log) {
  $delegate = function (exception, cause) {
    $log.error(exception, cause);
  };

  return $delegate;
}