import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GetSessionsUseCase } from './use-cases/get-sessions.use-case';

@WebSocketGateway({ cors: true, origin: '*', namespace: 'backend' })
export class BackendSessionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  constructor(private readonly getSessionsUseCase: GetSessionsUseCase) {}

  handleConnection(client: Socket) {
    Logger.log('Client connected! ');
  }

  handleDisconnect(client: Socket) {
    Logger.log('Client disconnected! ');
  }

  @SubscribeMessage('getSessions')
  async createSession() {
    const sessions = await this.getSessionsUseCase.execute();

    const event = 'getSessions';
    return {
      event,
      data: {
        sessions: sessions,
      },
    };
  }
}
