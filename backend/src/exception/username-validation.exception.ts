import { BaseException } from './base.exception';

export class UsernameValidationException extends BaseException {
  constructor() {
    super(400, 'username_validation', ['username']);
  }
}
