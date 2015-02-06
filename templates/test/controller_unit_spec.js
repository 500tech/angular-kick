describe('%CONTROLLER_NAME%', function () {
  var %CONTROLLER_VAR_NAME% = null;

  beforeEach(module('%APP_NAME%.controllers'));
  beforeEach(inject(function ($controller) {
      %CONTROLLER_VAR_NAME% = $controller('%CONTROLLER_NAME%');
  }));

  it('should init a name property on the controller instance', function () {
    expect(%CONTROLLER_VAR_NAME%.name).toBe('%CONTROLLER_VAR_NAME%');
  });
});
