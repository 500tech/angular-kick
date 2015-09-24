/**
 * annotate the target class with injectables.
 *
 * @param injectables - angular providers to inject
 * @returns {Function} decorator function
 */
export function Inject(...injectables) {
  return function (target) {
    target.$inject= [...injectables];
  }
}
