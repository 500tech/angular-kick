export function ifEnv(ENV) {
  return {
    restrict: 'A',
    priority: 600,
    transclude: 'element',
    terminal: true,
    link: function(scope, element, attrs, ctrl, $transclude) {
      if (ENV === attrs.ifEnv) {
        $transclude(function (clone) {
          element.after(clone);
        });
      }
    }
  }
}
