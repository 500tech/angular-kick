describe('%DIRECTIVE_NAME% Directive', function () {
  var element, $scope, createDirective;

  beforeEach(angular.mock.module('%APP_NAME%.directives'));

  beforeEach(angular.mock.inject(function ($rootScope, $compile) {
    createDirective = function (scopeAttrs) {
      $scope = angular.extend($rootScope.$new(), scopeAttrs);

      element = angular.element('<%DIRECTIVE_TAG_NAME%></%DIRECTIVE_TAG_NAME%>');
      element = $compile(element)($scope);
      $scope.$apply();
    };
  }));

  it('should be true', function () {
    createDirective({});
    expect(true).toBeTruthy();
  });
});
