import { Inject } from 'decorators/inject';

@Inject('$log')
export class %MODEL_NAME% {
  constructor ($log) {
    this.$log = $log;
    this.message = '%MODEL_NAME%';
  }
}
