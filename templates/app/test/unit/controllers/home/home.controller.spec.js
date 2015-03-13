var angular = require('angular');

describe('HomeController', function () {
  var homeController, createController, scope;

  beforeEach(angular.mock.module('%APP_NAME%.controllers'));

  beforeEach(angular.mock.inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    createController = function () {
      homeController = $controller('HomeController', { $scope: scope });
    };
  }));

  beforeEach(function () {
    createController();
  });

  it('should have default variable', function () {
    expect(homeController.command).toBe('state');
  });
});
