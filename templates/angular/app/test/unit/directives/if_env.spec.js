var angular = require('angular');

describe('ifEnv Directive', function () {
  var testElement, buildElement;

  beforeEach(angular.mock.module('%APP_NAME%.config', '%APP_NAME%.directives'));

  beforeEach(angular.mock.inject(function ($compile) {
    testElement = angular.element('<div><div if-env="test">Contents</div></div>');
    testElement = $compile(testElement)({});

    buildElement = angular.element('<div><div if-env="production">Contents</div></div>');
    buildElement = $compile(buildElement)({});
  }));

  it('should show element under correct environment', function () {
    expect(testElement.html()).toContain('Contents');
  });

  it('should destroy element under wrong environment', function () {
    expect(buildElement.html()).not.toContain('Contents');
  });
});
