export class HomeController {

  constructor () {
    var Home = this;
    Home.stateUrl = '/';
    Home.controllerName = 'HomeController';
  }

}

angular.module('%APP_NAME%.controllers').controller('HomeController', HomeController);