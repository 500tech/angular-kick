import { Inject } from 'decorators/inject';

@Inject('log')
export class %SERVICE_NAME% {
  constructor ($log) {
    this.$log = $log;
    this.message = '%SERVICE_NAME%';
  }
}
