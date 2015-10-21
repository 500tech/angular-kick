describe('%COMPONENT_NAME% Component', () => {
  let element, $scope, createComponent;

  beforeEach(angular.mock.module('%APP_NAME%.components'));

  beforeEach(angular.mock.inject(($rootScope, $compile) => {
    createComponent = (scopeAttrs) => {
      $scope = angular.extend($rootScope.$new(), scopeAttrs);

      element = angular.element('<%COMPONENT_TAG_NAME%></%COMPONENT_TAG_NAME%>');
      element = $compile(element)($scope);
      $scope.$apply();
    };
  }));

  it('should be true', () => {
    createComponent({});
    expect(true).toBeTruthy();
  });
});
