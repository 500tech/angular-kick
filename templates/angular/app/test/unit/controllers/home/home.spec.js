const angular = require('angular');

describe('HomeController', () => {
  let homeController, createController, scope;

  beforeEach(angular.mock.module('%APP_NAME%.controllers'));

  beforeEach(angular.mock.inject(($controller, $rootScope) => {
    scope = $rootScope.$new();
    createController = () => {
      homeController = $controller('HomeController', { $scope: scope });
    };
  }));

  beforeEach(() => {
    createController();
  });

  it('should have default variable', () => {
    expect(homeController.command).toBe('state');
  });
});
