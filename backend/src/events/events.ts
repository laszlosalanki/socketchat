import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import { TYPES } from '../utilities/types';
import { AuthService } from '../auth/interfaces/auth.service.interface';

@WebSocketGateway({ cors: true })
export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(TYPES.AuthService)
    private readonly authService: AuthService,
  ) {}

  @SubscribeMessage('message')
  private receiveMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse<any>> {
    client.broadcast.emit('message', {
      from: client.handshake.auth.username,
      data,
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
    }
  }
}