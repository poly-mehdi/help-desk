import { Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SessionCreatedEvent } from './events/session-created.event';
import { ParticipantSocketMapService } from './services/participant-socket-map/participant-socket-map.service';
import { GetSessionsUseCase } from './use-cases/get-sessions.use-case';
import { StartAssistanceUseCase } from './use-cases/start-assistance.use-case';

@WebSocketGateway({ cors: true, origin: '*', namespace: 'backend' })
export class BackendSessionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  constructor(
    private readonly getSessionsUseCase: GetSessionsUseCase,
    private readonly startAssistanceUseCase: StartAssistanceUseCase,
    private readonly participantSocketMap: ParticipantSocketMapService,
  ) {}

  handleConnection(client: Socket) {
    Logger.log('Client connected! ');
  }

  handleDisconnect(client: Socket) {
    Logger.log('Client disconnected! ');
  }

  @SubscribeMessage('getSessions')
  async getSessions() {
    const sessions = await this.getSessionsUseCase.execute();

    const event = 'getSessions';

    return {
      event,
      data: {
        sessions: sessions,
      },
    };
  }

  @SubscribeMessage('startAssistance')
  async startAssistance(
    @MessageBody()
    data: {
      sessionId: string;
    },
  ) {
    const hostRoomUrl = await this.startAssistanceUseCase.execute(data);
    const event = 'assistance.started';
    return {
      event,
      data: {
        hostRoomUrl: hostRoomUrl,
      },
    };
  }

  @OnEvent('session.created')
  async handleSessionCreatedEvent(event: SessionCreatedEvent) {
    this.server.emit('session.created', event.session);
  }
}
