class %COMPONENT_NAME%Controller {
  // @ngInject
  constructor($log, $element) {
    $log.log($element);
  }
}

export function %COMPONENT_NAME%() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: '/%COMPONENT_TEMPLATE_URL%',
    controller: %COMPONENT_NAME%Controller,
    controllerAs: '%COMPONENT_NAME%',
    bindToController: true
  };
}
