angular.module('%APP_NAME%.config')
    .config(function decorators($provide) {
        $provide.decorator('$exceptionHandler', exceptionHandlerDecorator);
    });

/**
 * override angularJS exception handler.
 * replace with your own implementation.
 *
 * @param $delegate
 * @param $log
 * @returns {Function}
 */
function exceptionHandlerDecorator($delegate, $log) {

    $delegate = function (excpetion, cause) {
        $log.error(excpetion, cause);
    };

    return $delegate
}