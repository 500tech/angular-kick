var angular = require('angular');

describe('Layout Service', function () {
  var Layout;

  beforeEach(angular.mock.module('%APP_NAME%.services', 'ui.router'));

  beforeEach(angular.mock.inject(function (_Layout_) {
    Layout = _Layout_;
  }));

  it('should set default layout to application', function () {
    expect(Layout.current).toBe('application');
  });

  it('should be able to change layout', function () {
    Layout.setLayout('example');
    expect(Layout.current).toBe('example');
  });
});
