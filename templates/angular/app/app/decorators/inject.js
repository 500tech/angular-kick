/**
 * annotate the target class with injectables.
 *
 * @param injectables - angular providers to inject
 * @type string
 * @returns {Function} decorator function
 */
export function Inject(...injectables) {
  return function injector(target) {
    target.$inject = [...injectables];
  };
}
