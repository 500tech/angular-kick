describe('%MODEL_NAME% Model', () => {
  let %MODEL_NAME%;

  beforeEach(angular.mock.module('%APP_NAME%.models'));

  beforeEach(angular.mock.inject((_%MODEL_NAME%_) => {
    %MODEL_NAME% = _%MODEL_NAME%_;
  }));

  it('should be true', () => {
    expect(%MODEL_NAME%).toBeDefined();
  });
});
