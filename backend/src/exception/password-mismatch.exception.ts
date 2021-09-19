import { BaseException } from './base.exception';

export class PasswordMismatchException extends BaseException {
  constructor() {
    super(400, 'password_mismatch', ['password']);
  }
}
