import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import { TYPES } from '../utilities/types';
import { AuthService } from '../auth/interfaces/auth.service.interface';
import { func } from 'joi';

const botName = 'SocketChat Bot';

@WebSocketGateway({ cors: true })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(TYPES.AuthService)
    private readonly authService: AuthService,
  ) {}

  @SubscribeMessage('list_users')
  private listUsers(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse<any>> {
    const users = new Array<string>();
    this.server.of('/').sockets.forEach(socket => users.push(socket.handshake.auth.username));
    client.emit('list_users', users);
    return null;
  }

  @SubscribeMessage('message')
  private receiveMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse<any>> {
    client.broadcast.emit('message', {
      from: client.handshake.auth.username,
      data,
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
      client.handshake.auth.username = user.username;
      client.broadcast.emit('user-connected', {
        from: botName,
        data: `${user.username} connected`,
        time: timeGenerator(),
      });
    }
  }

  public async handleDisconnect(client: any): Promise<any> {
    client.broadcast.emit('user-disconnected', {
      from: botName,
      data: `${client.handshake.auth.username} disconnected`,
      time: timeGenerator(),
    });
  }

  
}

export function timeGenerator() {
    const currentdate = new Date();
    if (currentdate.getMinutes() > 9 ) {
        return currentdate.getHours() + ":" + currentdate.getMinutes();
    }
    else {
        return currentdate.getHours() + ":" + "0" + currentdate.getMinutes();
    }
}
