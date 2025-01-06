import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { CreateSessionUseCase } from './use-cases/create-session.use-case';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true, origin: '*' })
export class SessionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly createSessionUseCase: CreateSessionUseCase) {}

  handleConnection(client: Socket, ...args: any[]) {
    Logger.log('Client connected! ', client.id);
    const sessionId = 'test';
    client.emit('session', sessionId);
  }

  handleDisconnect(client: Socket) {
    Logger.log('Client disconnected! ');
  }

  @SubscribeMessage('createSession')
  async createSession(
    @MessageBody()
    data: {
      firstName: string;
      lastName: string;
      email: string;
    },
    @ConnectedSocket()
    client: Socket,
  ) {
    const sessionId = client.request?.session?.id;
    if (!sessionId) {
      throw new Error('Session ID not found');
    }
    Logger.log(`Client session ID: ${sessionId}`);
    await this.createSessionUseCase.execute({ ...data, sessionId });
  }
}
