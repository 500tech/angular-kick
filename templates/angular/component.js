const templateUrl = require('%COMPONENT_TEMPLATE_URL%');

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
    templateUrl,
    controller: %COMPONENT_NAME%Controller,
    controllerAs: '%COMPONENT_NAME%',
    bindToController: true
  };
}
