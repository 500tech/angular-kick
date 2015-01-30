class HomeController {

  constructor () {
    this.stateUrl = '/';
    this.controllerName = 'HomeController';
  }

}

angular.module('%APP_NAME%.controllers').controller('HomeController', HomeController);