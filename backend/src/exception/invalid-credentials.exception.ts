import { BaseException } from './base.exception';

export class InvalidCredentialsException extends BaseException {
  constructor() {
    super(400, 'invalid_credentials', ['username', 'password']);
  }
}
