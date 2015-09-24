import { Inject } from 'decorators/inject';

@Inject('$scope', '$interval')
export class HomeController {

  constructor ($scope, $interval) {
    const Home = this;
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
