
    .state('%FULL_STATE_NAME%', {
      url: '%STATE_URL%',
      templateUrl: '/states/%STATE_PATH%.html',
      abstract: true,
      controller: '%STATE_CONTROLLER_NAME%Controller',
      controllerAs: '%STATE_CONTROLLER_NAME%'
    });
}
