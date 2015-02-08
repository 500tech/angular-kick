describe('ifEnv Directive', function () {
  var element, $scope, createDirective;

  beforeEach(module('%APP_NAME%.config', '%APP_NAME%.directives'));
  beforeEach(inject(function ($rootScope, $compile) {
    createDirective = function (scopeAttrs) {
      $scope = angular.extend($rootScope.$new(), scopeAttrs);

      element = angular.element('<div if-env="test">Contents</div>');
      element = $compile(element)($scope);
      $scope.$apply();
    };
  }));

  it('should be true', function () {
    createDirective({});
    expect(true).toBeTruthy();
  });
});
