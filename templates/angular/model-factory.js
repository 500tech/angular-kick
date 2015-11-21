class %MODEL_NAME% {

  constructor($log) {
    this.$log = $log;
    this.message = '%MODEL_NAME%';
  }
}

export /* @ngInject */ function %MODEL_NAME%Factory($log) {
  return %MODEL_NAME%.bind(null, $log);
}
