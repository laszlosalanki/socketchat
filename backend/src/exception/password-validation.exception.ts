import { BaseException } from './base.exception';

export class PasswordValidationException extends BaseException {
  constructor() {
    super(400, 'password_validation', ['password', 'password2']);
  }
}
