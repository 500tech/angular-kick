# angular-kick

[![npm version](https://badge.fury.io/js/angular-kick.svg)](http://npmjs.com/packages/angular-kick)
[![npm downloads](https://img.shields.io/npm/dm/angular-kick.svg)](http://npmjs.com/packages/angular-kick) 
[![Code Climate](https://codeclimate.com/github/500tech/angular-kick/badges/gpa.svg)](https://codeclimate.com/github/500tech/angular-kick)

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

Additionally, you can run the server under a specific environment:

```sh
$ kick server --production
```

To display useful information about the application, such as its name, AngularJS version and included bower components:

```sh
$ kick about
```

### Documentation

Check out our [documentation](http://www.angular-kick.com).

You can find there documentation on using other angular-kick features as generators, destroyers, running local server, testing and building for production.


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
