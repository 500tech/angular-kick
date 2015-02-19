describe('Layout Service', function () {
  var Layout;

  beforeEach(module('%APP_NAME%.services', 'ui.router'));

  beforeEach(inject(function (_Layout_) {
    Layout = _Layout_;
  }));

  it('should be true', function () {
    expect(true).toBeTruthy();
  });
});
