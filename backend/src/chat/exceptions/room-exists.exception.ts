import { BaseException } from '../../exception/base.exception';

export class RoomExistsException extends BaseException {
  constructor() {
    super(400, 'room_exists', ['room_name']);
  }
}
