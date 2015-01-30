class %STATE_CONTROLLER_NAME%Controller {
  constructor () {
    this.stateUrl = '/%STATE_NAME%';
    this.controllerName = '%STATE_CONTROLLER_NAME%Controller'
  }
};

angular.module('%APP_NAME%.controllers').controller('%STATE_CONTROLLER_NAME%Controller', %STATE_CONTROLLER_NAME%Controller);