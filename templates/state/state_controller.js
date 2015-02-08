export class %STATE_CONTROLLER_NAME%Controller {
  constructor () {
    var %STATE_CONTROLLER_NAME% = this;
    %STATE_CONTROLLER_NAME%.stateUrl = '/%STATE_NAME%';
    %STATE_CONTROLLER_NAME%.controllerName = '%STATE_CONTROLLER_NAME%Controller'
  }
}

angular.module('%APP_NAME%.controllers').controller('%STATE_CONTROLLER_NAME%Controller', %STATE_CONTROLLER_NAME%Controller);