export function exceptionHandlerDecorator($delegate, $log) {
  $delegate = function (exception, cause) {
    $log.error(exception, cause);
  };

  return $delegate;
}

exceptionHandlerDecorator.$inject = ['$delegate', '$log'];
