describe('%COMPONENT_NAME% Component', function () {
  var element, $scope, createComponent;

  beforeEach(angular.mock.module('%APP_NAME%.components'));

  beforeEach(angular.mock.inject(function ($rootScope, $compile) {
    createComponent = function (scopeAttrs) {
      $scope = angular.extend($rootScope.$new(), scopeAttrs);

      element = angular.element('<%COMPONENT_TAG_NAME%></%COMPONENT_TAG_NAME%>');
      element = $compile(element)($scope);
      $scope.$apply();
    };
  }));

  it('should be true', function () {
    createComponent({});
    expect(true).toBeTruthy();
  });
});
