export class %SERVICE_NAME% {
  constructor ($log) {
    this.$log = $log;
    this.message = '%SERVICE_NAME%';
  }
}

angular.module('%APP_NAME%.services').service('%SERVICE_NAME%', %SERVICE_NAME%);
