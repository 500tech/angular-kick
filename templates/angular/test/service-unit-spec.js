describe('%SERVICE_NAME% Service', () => {
  let %SERVICE_NAME%;

  beforeEach(angular.mock.module('%APP_NAME%.services'));

  beforeEach(angular.mock.inject((_%SERVICE_NAME%_) => {
    %SERVICE_NAME% = _%SERVICE_NAME%_;
  }));

  it('should be true', () => {
    expect(%SERVICE_NAME%).toBeDefined();
  });
});
