describe('%CONTROLLER_NAME%', () => {
  let %CONTROLLER_VAR_NAME%, createController;

  beforeEach(angular.mock.module('%APP_NAME%.controllers'));

  beforeEach(angular.mock.inject(($controller) => {
    createController = () => {
      %CONTROLLER_VAR_NAME% = $controller('%CONTROLLER_NAME%');
    };
  }));

  beforeEach(() => {
    createController();
  });

  it('should be true', () => {
    expect(%CONTROLLER_VAR_NAME%.message).toMatch('%CONTROLLER_NAME%');
  });
});
