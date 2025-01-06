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
export class SocketSessionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly createSessionUseCase: CreateSessionUseCase) {}

  handleConnection(client: Socket, ...args: any[]) {
    Logger.log('Client connected! ', client.id);
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
  ) {
    const session = await this.createSessionUseCase.execute({ ...data });

    const event = 'createSession';
    return { event, data: session };
  }
}
