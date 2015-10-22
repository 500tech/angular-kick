# Version 1.4.0:

* Feature: ESLint
* Fix: Cache busting for bundle.js
* Fix: Removed common chunks from tests, now tests run
* Fix: Changed ncp with cpr, should work better on windows
* Fix: Running kick with no arguments shows help by default
* Change: Remove layouts functionality
* Change: Partials now have own directory
* Change: Filename convention from snake-case (_) to param-case (-)
* Change: Replace @Inject decorator with ngAnnotate
* Change: Add strict-di for the application
* Change: All files are now in ES6 (incl. webpack, karma)

Every application is now generated with .eslintrc. For now, in
order to run it, you have to run ```kick lint```. Layouts are
now removed from core functionality and will be available later
as a separate npm module.

Partials with controllers are now deprecated in favor of components
and will be removed in future versions of kick.

# Version 1.3.0:

* Feature: Components
* Change: Generated directives are now restricted to 'A'
* Deprecated: Generating directive with a template

__Important change__: Components are directives with a template.
They now have their own place inside app/components directory.
Generating directives with --template (-t) argument is deprecated
and will be removed in future versions.

# Version 1.2.1:

* Fix: Hot reloading now works in webpack

# Version 1.2.0:

* Change: SugarJS is not included by default anymore
* Feature: Vendor files are separated in another chunk
* Fix: Added cache busting for bundles
* Fix: Changed /public to /dist in output
* Fix: Kick upgrade now does npm install instead of npm update

# Version 1.1.1:

* Fix: Typo in function name caused HTML templates not to load

# Version 1.1.0:

* Fix: HTML templates work correctly in production
* Fix: Add missing Inject decorator in generated files
* Fix: Change versions of style, autoprefixer and sass loaders

__Important change__: All the HTML templates are now required dynamically
from app.js. Instead of using require to bring templates inside states,
you can now only pass absolute path to a template from your app root


# Version 1.0.2:

* Feature: Enabled ES7 decorators
* Feature: Created @Inject decorator instead of ClassName.$inject syntax
* Fix: Remove minor NodeJS version lock
* Fix: Improved ifEnv directive to be more efficient
* Fix: Yes/No questions are now following UNIX standards
