describe('%CONTROLLER_NAME%', function () {
  var %CONTROLLER_VAR_NAME%, createController;

  beforeEach(module('%APP_NAME%.controllers'));

  beforeEach(inject(function ($controller) {
    createController = function () {
      %CONTROLLER_VAR_NAME% = $controller('%CONTROLLER_NAME%');
    };
  }));

  beforeEach(function () {
    createController()
  });

  it('should be true', function () {
    expect(%CONTROLLER_VAR_NAME%.controllerName).toBe('%CONTROLLER_NAME%');
  });
});
