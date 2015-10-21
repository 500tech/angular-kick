describe('%DIRECTIVE_NAME% Directive', () => {
  let element, $scope, createDirective;

  beforeEach(angular.mock.module('%APP_NAME%.directives'));

  beforeEach(angular.mock.inject(($rootScope, $compile) => {
    createDirective = (scopeAttrs) => {
      $scope = angular.extend($rootScope.$new(), scopeAttrs);

      element = angular.element('<%DIRECTIVE_TAG_NAME%></%DIRECTIVE_TAG_NAME%>');
      element = $compile(element)($scope);
      $scope.$apply();
    };
  }));

  it('should be true', () => {
    createDirective({});
    expect(true).toBeTruthy();
  });
});
