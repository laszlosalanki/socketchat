import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
  WsResponse,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from '../utilities/types';
import { AuthService } from '../auth/interfaces/auth.service.interface';
import { UserService } from '../user/interfaces/user.service.interface';
import { UserModel } from '../user/models/user.schema';
import { ChatService } from '../chat/service/chat.service.interface';
import { TranslationService } from '../chat/translation/service/translation.service.interface';
import { ChatRoomDto } from '../chat/dto/chat-room.dto';
import { RoomNotFoundException } from '../chat/exceptions/room-not-found.exception';

const botName = 'SocketChat Bot';

@Injectable()
@WebSocketGateway({ cors: true })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private roomData: Array<ChatRoomDto>;

  constructor(
    @Inject(TYPES.AuthService)
    private readonly authService: AuthService,
    @Inject(TYPES.UserService)
    private readonly userService: UserService,
    @Inject(TYPES.ChatService)
    private readonly chatService: ChatService,
    @Inject(TYPES.TranslationService)
    private readonly translationService: TranslationService,
  ) {
    this.loadRoomData();
  }

  private async loadRoomData() {
    this.roomData = await this.chatService.loadRooms();
  }

  @SubscribeMessage('create-room')
  private async createRoom(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse<any>> {
    if (client.rooms.has(data.roomName)) {
      // room already exists, don't create
      // list room users, messages, etc.
      client.emit('room-already-exists-exception');
    } else {
      // room does not exist, create
      const newRoom = await this.chatService.createChatRoom(
        client.handshake.auth.username,
        data.roomName,
        data.defaultLanguage,
      );
      this.roomData.push(newRoom);
      this.server
        .of('/')
        .sockets.forEach((socket) =>
          socket.emit('new-room-created', data.roomName),
        );
    }

    return { data: null, event: null };
  }

  @SubscribeMessage('join-room')
  private async joinRoom(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse<any>> {
    const roomData = await this.chatService.loadRoomData(data.roomName);

    // Delete the client from every other room
    client.rooms.clear();

    client.emit('load-room-data', roomData);
    client.join(data.roomName);

    if (
      !this.roomData.some((chatRoomDto) => chatRoomDto.name === data.roomName)
    ) {
      this.roomData.push(roomData);
    }

    return null;
  }

  @SubscribeMessage('list-users')
  private listUsers(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse<any>> {
    const users = new Array<string>();
    this.server
      .of('/')
      .sockets.forEach((socket) => users.push(socket.handshake.auth.username));
    client.emit('list-users', users);
    return null;
  }

  @SubscribeMessage('list-rooms')
  private listrooms(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse<any>> {
    client.emit('list-rooms', Array.from(client.rooms).splice(1));
    return null;
  }

  @SubscribeMessage('delete-room')
  private async deleteRoom(
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse<any>> {
    try {
      const [roomName] = client.rooms;

      await this.chatService.deleteRoom(
        roomName,
        client.handshake.auth.username,
      );

      this.server.to(roomName).emit('delete-room');

      const socketsInRoom = await this.server.in(roomName).allSockets();
      socketsInRoom.forEach((socketId) => {
        this.server.sockets.sockets.get(socketId).rooms.clear();
      });

      const roomIndex = this.roomData.findIndex(
        (roomData) => roomData.name === roomName,
      );
      this.roomData.splice(roomIndex, 1);
    } catch (exception) {
      if (exception instanceof RoomNotFoundException) {
        return {
          data: {
            error: {
              message: 'Nincs jogod törölni a szobát!',
            },
          },
          event: null,
        };
      }
    }

    return null;
  }

  @SubscribeMessage('message')
  private async receiveMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse<any>> {
    const [roomName] = client.rooms; // first is the global one, so we need the seconds

    const roomData = this.roomData.find((room) => room.name === roomName);

    if (!roomData) {
      // error
      return;
    }

    const translatedMessage = await this.translationService.translate(
      data,
      roomData.default_language,
    );

    await this.chatService.saveMesage(
      translatedMessage,
      client.handshake.auth.username,
      roomName,
    );

    client.broadcast.emit('message', {
      from: client.handshake.auth.username,
      data: translatedMessage,
      time: timeGenerator(),
    });

    client.emit('message', {
      from: 'You',
      data: translatedMessage,
      time: timeGenerator(),
    });

    return null;
  }

  public async handleConnection(client: Socket, ...args: any[]): Promise<any> {
    const token = client.handshake.auth.token;
    const user = await this.authService.verifyAuthToken(token);
    if (!user) {
      client.disconnect(true);
    } else {
      client.data = {
        loginTime: Date.now(),
      };
      client.handshake.auth.username = user.username;
      client.broadcast.emit('user-connected', {
        from: botName,
        data: `${user.username} connected`,
        time: timeGenerator(),
      });
    }
  }

  public async handleDisconnect(client: any): Promise<any> {
    try {
      if (!client.handshake.auth || !client.handshake.auth.username) {
        return;
      }

      const user: UserModel = await this.userService.findUser({
        username: client.handshake.auth.username,
      });
      user.spent_time += Date.now() - client.data.loginTime;

      await this.userService.update(user);

      client.broadcast.emit('user-disconnected', {
        from: botName,
        data: `${client.handshake.auth.username} disconnected`,
        time: timeGenerator(),
      });
    } catch (exception) {
      // handle
    }
  }
}

export function timeGenerator() {
  const currentdate = new Date();
  if (currentdate.getMinutes() > 9) {
    return currentdate.getHours() + ':' + currentdate.getMinutes();
  } else {
    return currentdate.getHours() + ':' + '0' + currentdate.getMinutes();
  }
}
