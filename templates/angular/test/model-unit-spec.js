describe('%MODEL_NAME% Model', function () {
  var %MODEL_NAME%;

  beforeEach(angular.mock.module('%APP_NAME%.services'));

  beforeEach(angular.mock.inject(function (_%MODEL_NAME%_) {
    %MODEL_NAME% = _%MODEL_NAME%_;
  }));

  it('should be true', function () {
    expect(true).toBeTruthy();
  });
});
