class %COMPONENT_NAME%Controller {
  // @ngInject
  constructor($log, $element) {
    $log.log($element);
  }
}

export const %COMPONENT_NAME% = {
  bindings: {},
  templateUrl: '/%COMPONENT_TEMPLATE_URL%',
  controller: %COMPONENT_NAME%Controller,
  controllerAs: '%COMPONENT_NAME%'
};
