import { ChatService } from './chat.service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from '../../utilities/types';
import { ChatRepository } from '../repository/chat.repository';
import { ChatRoomDocument, ChatRoomModel } from '../models/chat-room.schema';
import { ChatRoomDto } from '../dto/chat-room.dto';
import { RoomExistsException } from '../exceptions/room-exists.exception';
import { RoomNotFoundException } from '../exceptions/room-not-found.exception';
import { ChatMessageSchema } from '../models/chat-message.schema';

@Injectable()
export class ChatServiceImpl implements ChatService {
  constructor(
    @Inject(TYPES.ChatRepository)
    private readonly chatRepository: ChatRepository,
  ) {}

  public async createChatRoom(
    owner: string,
    roomName: string,
    defaultLanguage: string,
  ): Promise<ChatRoomDto> {
    if (await this.chatRepository.exists({ name: roomName })) {
      throw new RoomExistsException();
    }

    const chatRoom = new ChatRoomModel();
    chatRoom.name = roomName;
    chatRoom.owner = owner;
    chatRoom.default_language = defaultLanguage;
    chatRoom.created_at = Date.now();

    await this.chatRepository.create(<ChatRoomDocument>chatRoom);

    return chatRoom;
  }

  public loadRoomData(roomName: string): Promise<ChatRoomDto> {
    return this.chatRepository.find({ name: roomName });
  }

  public loadRooms(): Promise<Array<ChatRoomDto>> {
    return this.chatRepository.findAll();
  }

  public async deleteRoom(roomName: string, user: string): Promise<void> {
    const room = await this.chatRepository.find({
      name: roomName,
      owner: user,
    });
    if (!room) {
      throw new RoomNotFoundException();
    }

    return this.chatRepository.delete(room);
  }

  public async saveMesage(
    message: string,
    sender: string,
    roomName: string,
  ): Promise<void> {
    const chatMessageSchema = new ChatMessageSchema();
    chatMessageSchema.created_at = Date.now();
    chatMessageSchema.content = message;
    chatMessageSchema.created_by = sender;

    const room = await this.chatRepository.find({ name: roomName });
    room.messages.push(chatMessageSchema);

    return this.chatRepository.update(room);
  }
}
