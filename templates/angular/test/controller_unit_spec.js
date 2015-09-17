describe('%CONTROLLER_NAME%', function () {
  var %CONTROLLER_VAR_NAME%, createController;

  beforeEach(angular.mock.module('%APP_NAME%.controllers'));

  beforeEach(angular.mock.inject(function ($controller) {
    createController = function () {
      %CONTROLLER_VAR_NAME% = $controller('%CONTROLLER_NAME%');
    };
  }));

  beforeEach(function () {
    createController()
  });

  it('should be true', function () {
    expect(%CONTROLLER_VAR_NAME%.message).toMatch('%CONTROLLER_NAME%');
  });
});
