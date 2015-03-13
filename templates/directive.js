export class %DIRECTIVE_NAME%Controller {
  constructor($element) {
    console.log($element);
  }
}

angular.module('%APP_NAME%.directives').directive('%DIRECTIVE_NAME%', function () {
  return {
    restrict: 'EA',
    scope: {},
    controller: %DIRECTIVE_NAME%Controller,
    controllerAs: '%DIRECTIVE_NAME%',
    bindToController: true
  }
});
