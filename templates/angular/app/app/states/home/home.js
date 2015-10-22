export class HomeController {

  // @ngInject
  constructor($scope, $interval) {
    const ROTATING_INTERVAL = 2000;

    const commands = [
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

    this.command = commands[0];

    const rotateCommands = $interval(() => {
      commands.push(commands.splice(0, 1)[0]);
      this.command = commands[0];
    }, ROTATING_INTERVAL);

    $scope.$on('$destroy', () => {
      $interval.cancel(rotateCommands);
    });
  }

}
