export class %MODEL_NAME% {
  constructor ($log) {
    this.$log = $log;
    this.message = '%MODEL_NAME%';
  }
}

angular.module('%APP_NAME%.services').service('%MODEL_NAME%', %MODEL_NAME%);
