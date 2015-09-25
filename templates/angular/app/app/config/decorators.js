import { Inject } from 'decorators/inject';

@Inject('$delegate', '$log')
export function exceptionHandlerDecorator($delegate, $log) {
  $delegate = function (exception, cause) {
    $log.error(exception, cause);
  };

  return $delegate;
}
