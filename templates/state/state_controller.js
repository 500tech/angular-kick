export class %STATE_CONTROLLER_NAME%Controller {
  constructor () {
    this.message = 'Hello from %STATE_CONTROLLER_NAME%Controller';
  }
}

angular.module('%APP_NAME%.controllers').controller('%STATE_CONTROLLER_NAME%Controller', %STATE_CONTROLLER_NAME%Controller);