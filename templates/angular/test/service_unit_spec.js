describe('%SERVICE_NAME% Service', function () {
  var %SERVICE_NAME%;

  beforeEach(angular.mock.module('%APP_NAME%.services'));

  beforeEach(angular.mock.inject(function (_%SERVICE_NAME%_) {
    %SERVICE_NAME% = _%SERVICE_NAME%_;
  }));

  it('should be true', function () {
    expect(true).toBeTruthy();
  });
});
