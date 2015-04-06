export function decorators($provide) {
  $provide.decorator('$exceptionHandler', exceptionHandlerDecorator);
}

function exceptionHandlerDecorator($delegate, $log) {
  $delegate = function (exception, cause) {
    $log.error(exception, cause);
  };

  return $delegate;
}