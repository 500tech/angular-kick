describe('ifEnv Directive', function () {
  var devElement, buildElement;

  beforeEach(module('%APP_NAME%.config', '%APP_NAME%.directives'));

  beforeEach(inject(function ($compile) {
    devElement = angular.element('<div><div if-env="development">Contents</div></div>');
    devElement = $compile(devElement)({});

    buildElement = angular.element('<div><div if-env="production">Contents</div></div>');
    buildElement = $compile(buildElement)({});
  }));

  it('should show element under correct environment', function () {
    expect(devElement.html()).toContain('Contents');
  });

  it('should destroy element under wrong environment', function () {
    expect(buildElement.html()).not.toContain('Contents');
  });
});
