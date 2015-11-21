class %SERVICE_NAME% {

  // @ngInject
  constructor($log) {
    this.$log = $log;
    this.message = '%SERVICE_NAME%';
  }
}

export /* @ngInject */ function %SERVICE_NAME%Factory($log) {
  return %SERVICE_NAME%.bind(null, $log);
}
