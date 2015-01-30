describe('HomeController', function () {
  var homeTrueController, createController;

  beforeEach(module('%APP_NAME%.controllers'));
  beforeEach(inject(function ($controller) {
    createController = function () {
      homeTrueController = $controller('HomeController');
    };
  }));

  it('should be true', function () {
    createController();
    expect(true).toBeTruthy();
  });
});
