export class %CONTROLLER_NAME% {
  constructor () {
    var %CONTROLLER_VARIABLE% = this;
    %CONTROLLER_VARIABLE%.controllerName = '%CONTROLLER_NAME%'
  }
}

angular.module('%APP_NAME%.controllers').controller('%CONTROLLER_NAME%', %CONTROLLER_NAME%);