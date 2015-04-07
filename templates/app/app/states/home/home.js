export class HomeController {

  constructor ($scope, $interval) {
    var Home = this;
    let commands = [
      'state',
      'model',
      'service',
      'directive',
      'filter',
      'partial',
      'config',
      'stylesheet',
      'environment'
    ];

    Home.command = commands[0];

    let rotateCommands = $interval(function () {
      commands.push(commands.splice(0, 1)[0]);
      Home.command = commands[0];
    }, 2000);

    $scope.$on('$destroy', function () {
      $interval.cancel(rotateCommands);
    });
  }

}

HomeController.$inject = ['$scope', '$interval'];