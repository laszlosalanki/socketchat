import { BaseException } from '../../exception/base.exception';

export class RoomNotFoundException extends BaseException {
  constructor() {
    super(400, 'room_not_found', ['room_name']);
  }
}
