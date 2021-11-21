import { ChatRoomDto } from '../dto/chat-room.dto';

export interface ChatService {
  createChatRoom(
    owner: string,
    roomName: string,
    defaultLanguage: string,
  ): Promise<ChatRoomDto>;
  loadRoomData(roomName: string): Promise<ChatRoomDto>;
  loadRooms(): Promise<Array<ChatRoomDto>>;
  deleteRoom(roomName: string, user: string): Promise<void>;
  saveMesage(message: string, sender: string, roomName: string): Promise<void>;
}
