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
import { ClientJoinedQueueUseCase } from './use-cases/client-joined-queue.use-case';
import { sessionMiddleware } from 'src/main';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true, origin: '*' })
export class SessionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    server.engine.use(sessionMiddleware);
  }

  constructor(
    private readonly clientJoinedQueueUseCase: ClientJoinedQueueUseCase,
  ) {}

  handleConnection(client: Socket, ...args: any[]) {
    Logger.log('Client connected! ', client.id);
    const sessionId = client.request.session.id;
    Logger.log(`ssid: ${sessionId}`);
    client.emit('session', sessionId);
  }

  handleDisconnect(client: Socket) {
    Logger.log('Client disconnected! ');
  }

  @SubscribeMessage('clientJoinedQueue')
  async handleClientJoinedQueue(
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
    await this.clientJoinedQueueUseCase.execute({ ...data, sessionId });
  }
}
