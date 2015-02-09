describe('%SERVICE_NAME% Service', function () {
  var %SERVICE_NAME%;

  beforeEach(module('%APP_NAME%.services'));

  beforeEach(inject(function (_%SERVICE_NAME%_) {
    %SERVICE_NAME% = _%SERVICE_NAME%_;
  }));

  it('should be true', function () {
    expect(true).toBeTruthy();
  });
});
