import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChatRoomDto } from '../dto/chat-room.dto';
import { TYPES } from '../../utilities/types';
import { ChatService } from '../service/chat.service.interface';

@Controller('room')
export class RoomController {
  constructor(
    @Inject(TYPES.ChatService)
    private readonly chatService: ChatService,
  ) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard('jwt'))
  private async create(@Req() request): Promise<any> {
    const { room_name, default_language } = request.body;
    await this.chatService.createChatRoom(
      request.user.username,
      room_name,
      default_language,
    );
  }

  @Delete()
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  private async delete(@Req() request): Promise<any> {
    const { room_name } = request.body;
    await this.chatService.deleteRoom(request.user.username, room_name);
  }

  @Get()
  @HttpCode(200)
  private listAll(): Promise<Array<ChatRoomDto>> {
    return this.chatService.loadRooms();
  }
}
