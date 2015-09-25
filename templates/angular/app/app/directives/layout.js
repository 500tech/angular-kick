import { Inject } from 'decorators/inject';

@Inject('$rootScope', 'Layout')
class layoutController {
  constructor($rootScope, Layout) {
    let layout = this;

    $rootScope.$on('$stateChangeSuccess', function() {
      layout.current = Layout.getLayout(); 
    });

    $rootScope.$on('layoutChange', function () {
      layout.current = Layout.getLayout();
    });
  }
}

export function layout() {
  return {
    restrict: 'EA',
    scope: {},
    controller: layoutController,
    controllerAs: 'layout',
    bindToController: true,
    template: "<ng-include src='layout.current'></ng-include>"
  }
}
