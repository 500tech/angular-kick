# kick

[![npm version](https://badge.fury.io/js/kick.svg)](http://npmjs.com/packages/kick)
[![npm downloads](https://img.shields.io/npm/dm/kick.svg)](http://npmjs.com/packages/kick)
[![travis build](https://travis-ci.org/500tech/angular-kick.svg?branch=master)](https://travis-ci.org/500tech/angular-kick)
[![Code Climate](https://codeclimate.com/github/500tech/angular-kick/badges/gpa.svg)](https://codeclimate.com/github/500tech/angular-kick)

![angular-kick logo](http://static.angular-kick.com/kick-logo.png)

Angular-kick is opinionated kickstarter and generator for classic single-page AngularJS applications. Based on **ECMAScript 6**, **webpack** and **best practices**. It allows you to create a working state-based application in no time, and add develop with ease.

Brought to you by [500Tech](http://500tech.com).


## Best practices

There are too many conventions for writing AngularJS applications, and after trying all the generators and conventions outside in tens of projects, we have put all of our experience to kick, to make your development as fast and easy as possible.

Angular-kick uses conventions from [AngularJS Style Guide](https://github.com/toddmotto/angularjs-styleguide) by Todd Motto, which we encourage you to follow as well.


## Install

In order to use `kick`, make sure you have node.js and npm installed:

https://docs.npmjs.com/getting-started/installing-node

**Note:** You need node >=4.0 in order to use kick

Then, install kick by running:

```sh
$ npm install -g kick
```


## Usage

**Notice:** Run ```kick help``` to see available commands

### Creating new application

Creating a new application is as simple as running:

```sh
$ kick new [application-name]
```

After you have created the application, you can run the server, 
which will automatically reload the browser when you make changes to files. 
You can also run it in TDD mode, which will run test suit on every file change. 

```sh
$ cd application-name
$ kick tdd
```

Additionally, you can run the server under a specific environment:

```sh
$ kick start production
```

To display useful information about the application, such as its name and AngularJS version.

```sh
$ kick about
```

### Documentation

Check out our [documentation](http://www.angular-kick.com).

You can find there documentation on using other kick features as generators, destroyers, running local server, testing and building for production.


### Updating angular-kick

Checking for updates on each command slows down cli apps a lot. Hence, angular-kick won't check for updates automatically.
You can check for a new version by running:

```sh
$ kick upgrade
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
