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
import { StartAssistanceUseCase } from './use-cases/start-assistance.use-case';

@WebSocketGateway({ cors: true, origin: '*' })
export class SocketSessionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private sessionSocketMap: Map<string, string> = new Map();

  constructor(
    private readonly createSessionUseCase: CreateSessionUseCase,
    private readonly startAssistanceUseCase: StartAssistanceUseCase,
  ) {}

  handleConnection(client: Socket, ...args: any[]) {
    const sessionId = client.handshake.auth.sessionId;
    sessionId
      ? (this.sessionSocketMap.set(sessionId, client.id),
        Logger.log(`Client reconnected! Session ID: ${sessionId}`))
      : Logger.log(
          `Client connected for the first time! Socket ID: ${client.id}`,
        );
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
    @ConnectedSocket() client: Socket,
  ) {
    const session = await this.createSessionUseCase.execute({ ...data });
    this.sessionSocketMap.set(session.id, client.id);

    const event = 'createSession';
    return { event, data: session };
  }

  @SubscribeMessage('startAssistance')
  async startAssistance(
    @MessageBody()
    data: {
      sessionId: string;
    },
  ) {
    Logger.log(`Starting assistance for session ${data.sessionId}`);
    const assistance = await this.startAssistanceUseCase.execute({
      sessionId: data.sessionId,
    });
    const socketId = this.sessionSocketMap.get(data.sessionId);
    this.server.to(socketId).emit('advisor.connected', assistance);
  }
}
