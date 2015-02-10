describe('HomeController', function () {
  var homeController, createController;

  beforeEach(module('%APP_NAME%.controllers'));

  beforeEach(inject(function ($controller) {
    createController = function () {
      homeController = $controller('HomeController');
    };
  }));

  beforeEach(function () {
    createController()
  });

  it('should be true', function () {
    expect(homeController.controllerName).toBe('HomeController');
  });
});
