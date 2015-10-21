// Annotate the target class with injectables
export function Inject(...injectables) {
  return function injector(target) {
    target.$inject = [...injectables];
  };
}
