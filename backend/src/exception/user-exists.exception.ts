import { BaseException } from './base.exception';

export class UserExistsException extends BaseException {
  constructor() {
    super(400, 'user_exists', ['username']);
  }
}
