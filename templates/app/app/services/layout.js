class Layout {
  constructor ($rootScope, $state) {
    let self = this;

    this.current = 'application';

    $rootScope.currentLayout = function() {
      return self.getLayout($state);
    }
  }

  setLayout (name) {
    this.current = name;
  }

  getLayout ($state) {
    let layout = this.current;

    // If layout is defined in the state's data - use that instead
    if ($state.current.data && $state.current.data.layout) {
      layout = $state.current.data.layout;
    }

    return 'layouts/' + layout + '.html';
  }
}

angular.module('%APP_NAME%.services').service('Layout', Layout);
