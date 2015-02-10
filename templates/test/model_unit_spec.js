describe('%MODEL_NAME% Model', function () {
  var %MODEL_NAME%;

  beforeEach(module('%APP_NAME%.services'));

  beforeEach(inject(function (_%MODEL_NAME%_) {
    %MODEL_NAME% = _%MODEL_NAME%_;
  }));

  it('should be true', function () {
    expect(true).toBeTruthy();
  });
});
