describe('%FILTER_NAME% Filter', () => {
  let %FILTER_NAME%;

  beforeEach(angular.mock.module('%APP_NAME%.filters'));

  beforeEach(angular.mock.inject(($filter) => {
    %FILTER_NAME% = $filter('%FILTER_NAME%');
  }));

  it('should be true', () => {
    expect(%FILTER_NAME%).not.toBeNull();
  });

});
