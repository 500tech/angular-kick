class %COMPONENT_NAME%Controller {

  // @ngInject
  constructor($element) {
    console.log($element);
  }
}

export function %COMPONENT_NAME%() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: require('%COMPONENT_TEMPLATE_URL%'),
    controller: %COMPONENT_NAME%Controller,
    controllerAs: '%COMPONENT_NAME%',
    bindToController: true
  }
}
