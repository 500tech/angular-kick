describe('HomeController', function () {
  var homeController, createController, scope;

  beforeEach(module('%APP_NAME%.controllers'));

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    createController = function () {
      homeController = $controller('HomeController', { $scope: scope });
    };
  }));

  beforeEach(function () {
    createController()
  });

  it('should be true', function () {
    expect(homeController.command).toBe('state');
  });
});
