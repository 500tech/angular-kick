describe('%CONTROLLER_NAME%', function () {
  var %CONTROLLER_VAR_NAME%, createController;

  beforeEach(module('%APP_NAME%.controllers'));
  beforeEach(inject(function ($controller) {
    createController = function () {
      %CONTROLLER_VAR_NAME% = $controller('%CONTROLLER_NAME%');
    };
  }));

  it('should be true', function () {
    createController();
    expect(true).toBeTruthy();
  });
});
