"use strict";

//= require modules.js

angular.module('%APP_NAME%', [
  '%APP_NAME%.config',
  '%APP_NAME%.services',
  '%APP_NAME%.directives',
  '%APP_NAME%.controllers',
  '%APP_NAME%.templates'
]);

angular.module('%APP_NAME%').run(function ($rootScope, $state) {
});

//= require_tree services
//= require_tree directives
//= require_tree filters
//= require_tree config
//= require_tree states
