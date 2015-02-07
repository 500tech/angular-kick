# angular-kick

**Disclaimer:** angular-kick is currently in alpha stage and it's only tested on MacOS X. Some functionality might change. Feel free to add issues to our [github](http://github.com/500tech/angular-kick) if you encounter any problems.

Angular-kick is an opinionated kickstarter and generator for AngularJS based on ECMAScript 6 and best practices. It allows you to start a classic single-page application in no time and working with it with ease.

Brought to you by [500Tech](http://500tech.com).

## Best practices

There are too many conventions for writing AngularJS applications, and after trying all the generators and conventions outside in tens of projects, we have put all of our experience to angular-kick, to make your development as fast and easy as possible.

We strongly recommend you to follow [AngularJS Style Guide](https://github.com/johnpapa/angularjs-styleguide) by John Papa.

## Install

```sh
$ npm install -g angular-kick
```


## Usage

**Notice:** Run ```kick help``` to see available commands

### Creating new application

Creating a new application is as simple as running:

```sh
$ kick new [application-name]
```

After you have created the application, you will have to download npm dependencies needed for Gulp and starter components from bower.
You can do that by running:

```sh
$ cd applicationName
$ kick setup
```

Now you can run the server, which will automatically reload the browser when you make changes to files. You can also run it in TDD mode, which will run test suit on every file change.

```sh
$ kick server
$ kick server:tdd
```

Additionally, you can server under specific environment:

```sh
$ kick server --production
```

To display useful information about an application, such as its name, AngularJS version and included bower components:

```sh
$ kick about
```

### Generators and destroyers

Kick will generate angular entities for you.  Running ```destroy``` will do the opposite, deleting the generated files and folders.

```sh
$ kick generate [type] [names...] <options>
$ kick destroy [type] [names...]
```

#### State

```sh
$ kick generate state [name] [substates...] <options>
```

This will generate a view and a controller for the state under the app/states folder. Each state's new root state will create a route file in app/routes folder, nested states will be included in that file. This will also generate unit tests for each controller and a stylesheet for each root state.

To create nested state, just pass slashes between names, for example:

```sh
$ kick generate state orders/new
```

You can pass as many substates as you like, for example:

```sh
$ kick generate state emails inbox sent archive
```

will create 4 states: 'emails', 'emails.inbox', 'emails.sent' and 'emails.archive'.
All of them will appear in app/routes/emails.js file.

##### CRUD states

When you pass crud as a substate, it will automatically create 4 substates:

```sh
$ kick generate state users crud
```

generates 'users', 'users.list', 'users.new', 'users.show', 'users.edit'

Available options:

* --abstract (-a)
* --no-controller (-nc)

#### Service

```sh
$ kick generate service [names...]
```

This will generate services under app/services directory and unit tests for each of them. You can pass as many names as you like. You can also generate services in subdirectories:

```sh
$ kick generate service auth models/user models/order
```

#### Directive

```sh
$ kick generate directive [names...]
```

This will generate a directive under app/directives folder. It will also generate a unit test. You can pass as many names as you like. You can also generate directives in subdirectories:

```sh
$ kick generate directive pagination users/avatar
```

#### Filter

```sh
$ kick generate filter [names...]
```

This will generate filters under app/filters directory and unit tests for each of them. You can pass as many names as you like. You can also generate filters in subdirectories:

```sh
$ kick generate filter uppercase inputs/url
```

#### Partial

```sh
$ kick generate partial [names...] <options>
```

This will generate a partial named _your_partial_name.html in the under specified state:

```sh
$ kick generate partial users/index/user-info
```

If you don't specify a state name, the partial will be created in app/states/shared directory.

Sometimes you want your partials to belong to controller. You can use the --controller option, which will generate a partial along with its controller and also a unit test for it:

```sh
$ kick generate partial top_bar --controller
```

Available options:

* --controller (-c)

#### Config

```sh
$ kick generate config [names...]
```

This will generate config files under app/configs directory. You can pass as many names as you like. You can also generate config files in subdirectories:

```sh
$ kick generate config interceptors api/endpoints
```

#### Style

```sh
$ kick generate style [names...]
```

This will generate stylesheets under app/assets/stylesheets directory and automatically include them in application.scss file. Remember that a new stylesheet is automatically generated for each root state. You can pass as many names as you like. You can also generate stylesheets in subdirectories:

```sh
$ kick generate style top-bar base/buttons base/forms
```

### Testing

The tests files are located in /tests directory. When you use kick generators, unit tests are automatically created for you in that directory. The tests run with Karma in Chrome browser.

You can run test suit once:

```sh
$ kick test
```

Or continously watch files and run test suit on every file change:

```sh
$ kick server:tdd
```

Additionally, you can run tests for specific environment:

```sh
$ kick test --production
```


### Building for production

```sh
$ kick build
```

When your application is ready for production, you run this command and all your files will be concatenated, minified and outputted into /public directory.

Additionally, you can build application for specific environment:

```sh
$ kick build --development
```

### Updating angular-kick

Checking for updates on each command slows down cli apps a lot. Hence, angular-kick won't check for updates automatically.
You can check for a new version by running:

```sh
$ kick update
```

This will ask you if you want to update when there is a new version available.


## License

MIT Licensed

Copyright (c) 2015, [500Tech](http://500tech.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sub-license, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
