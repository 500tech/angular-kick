describe('HomeController', function () {
  var homeTrueController = null;

  beforeEach(module('%APP_NAME%.controllers'));

  beforeEach(inject(function ($controller) {
      homeTrueController = $controller('HomeController');
  }));

  it('should init a name property on the controller instance', function () {
      expect(%CONTROLLER_VAR_NAME%.name).toBe('%CONTROLLER_VAR_NAME%');
  });
});
