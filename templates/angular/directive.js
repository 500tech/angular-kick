class %DIRECTIVE_NAME%Controller {

  // @ngInject
  constructor($log, $element) {
    $log.log($element);
  }
}

export function %DIRECTIVE_NAME%() {
  return {
    restrict: 'A',
    scope: {},
    controller: %DIRECTIVE_NAME%Controller,
    controllerAs: '%DIRECTIVE_NAME%',
    bindToController: true
  };
}
