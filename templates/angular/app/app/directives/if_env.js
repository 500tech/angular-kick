export function ifEnv(ENV) {
  return function (scope, element, attrs) {
    if (ENV !== attrs.ifEnv) { element.remove(); }
  }
}
