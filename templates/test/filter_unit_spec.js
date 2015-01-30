describe('%FILTER_NAME% Filter', function () {
  var %FILTER_NAME%;

  beforeEach(module('%APP_NAME%.filters'));
  beforeEach(inject(function ($filter) {
    %FILTER_NAME% = $filter('%FILTER_NAME%');
  }));

  it('should be true', function () {
    expect(%FILTER_NAME%).not.toBeNull();
  });

});
