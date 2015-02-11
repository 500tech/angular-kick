class layoutController {
  constructor($rootScope, Layout) {
    let layout = this;

    $rootScope.$on('$stateChangeSuccess', function() {
      layout.current = Layout.getLayout(); 
    });
  }
}

angular.module('%APP_NAME%.directives').directive('layout', function () {
  return {
    restrict: 'EA',
    scope: {},
    controller: layoutController,
    controllerAs: 'layout',
    bindToController: true,
    template: "<ng-include src='layout.current'></ng-include>"
  }
});

