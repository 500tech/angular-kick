var angular = require('angular');

describe('ifEnv Directive', function () {
  var testElement, buildElement;

  beforeEach(angular.mock.module('%APP_NAME%.config', '%APP_NAME%.directives'));

  beforeEach(angular.mock.inject(function ($compile, $rootScope) {
    testElement = angular.element('<div><div if-env="test">Contents</div></div>');
    testElement = $compile(testElement)($rootScope);

    buildElement = angular.element('<div><div if-env="production">Contents</div></div>');
    buildElement = $compile(buildElement)($rootScope);
  }));

  it('should render element under correct environment', function () {
    expect(testElement.html()).toContain('Contents');
  });

  it('should not render element under wrong environment', function () {
    expect(buildElement.html()).not.toContain('Contents');
  });
});
