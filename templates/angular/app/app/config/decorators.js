export function exceptionHandlerDecorator($log) {
  return (exception, cause) => $log.error(exception, cause);
}

exceptionHandlerDecorator.$inject = ['$delegate', '$log'];
