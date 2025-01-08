import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { CreateSessionUseCase } from './use-cases/create-session.use-case';
import { Logger } from '@nestjs/common';
import { StartAssistanceUseCase } from './use-cases/start-assistance.use-case';

@WebSocketGateway({ cors: true, origin: '*' })
export class SocketSessionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    private readonly createSessionUseCase: CreateSessionUseCase,
    private readonly startAssistanceUseCase: StartAssistanceUseCase,
  ) {}

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

  @SubscribeMessage('startAssistance')
  async startAssistance(
    @MessageBody()
    data: {
      firstName: string;
      lastName: string;
      email: string;
      sessionId: string;
    },
  ) {
    const assistance = await this.startAssistanceUseCase.execute({ ...data });

    const event = 'startAssistance';
    return { event, data };
  }
}
