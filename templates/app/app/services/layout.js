export class Layout {
  constructor ($rootScope) {
    this.$rootScope = $rootScope;
  }

  setLayout (name) {
    this.$rootScope.currentLayout = 'layouts/' + name + '.html'
  }
}

angular.module('%APP_NAME%.services').service('Layout', Layout);
