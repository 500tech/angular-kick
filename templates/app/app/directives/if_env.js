class ifEnvController {
  constructor(ENV, $element, $attrs) {
    if (ENV !== $attrs.ifEnv) {
      $element.remove();
    }
  }
}

angular.module('%APP_NAME%.directives').directive('ifEnv', function () {
  return {
    restrict: 'A',
    scope: {},
    controller: ifEnvController,
    controllerAs: 'ifEnv',
    bindToController: true
  }
});
