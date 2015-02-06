describe('HomeController', function () {
  var HomeController = null;

  beforeEach(module('%APP_NAME%.controllers'));

  beforeEach(inject(function ($controller) {
      HomeController = $controller('HomeController');
  }));

  it('should init a name property on the controller instance', function () {
      expect(HomeController.name).toBe('HomeController');
  });
});
