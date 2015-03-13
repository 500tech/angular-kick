System.config({
  "baseURL": "/",
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.14",
    "angular-mocks": "github:angular/bower-angular-mocks@1.3.14",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.13",
    "github:angular-ui/ui-router@0.2.13": {
      "angular": "github:angular/bower-angular@1.3.14"
    },
    "github:angular/bower-angular-mocks@1.3.14": {
      "angular": "github:angular/bower-angular@1.3.14"
    }
  }
});

