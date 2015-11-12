class %DIRECTIVE_NAME%Controller {
  // @ngInject
  constructor($element) {
    console.log($element);
  }
}

export function %DIRECTIVE_NAME%() {
  return {
    restrict: 'A',
    scope: {},
    templateUrl: '/%DIRECTIVE_TEMPLATE_URL%',
    controller: %DIRECTIVE_NAME%Controller,
    controllerAs: '%DIRECTIVE_NAME%',
    bindToController: true
  };
}
