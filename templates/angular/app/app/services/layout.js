import { Inject } from 'decorators/inject';

@Inject('$rootScope', '$state')
export class Layout {
  constructor ($rootScope, $state) {

    this.current = 'application';
    this.$state = $state;
    this.$rootScope = $rootScope;
  }

  setLayout (name) {
    this.current = name;
    this.$rootScope.$broadcast('layoutChange');
  }

  getLayout () {
    let layout = this.current;

    // If layout is defined in the state's data - use that instead
    if (this.$state.current.data && this.$state.current.data.layout) {
      layout = this.$state.current.data.layout;
    }

    return `/layouts/${layout}.html`;
  }
}
