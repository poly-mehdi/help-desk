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
import { EndAssistanceUseCase } from './use-cases/end-assistance.use-case';
import { AssistanceEndedByUserEvent } from './events/assistance-ended-by-user.event';
import { UpdateInfoUserEvent } from './events/update-info-user.event';

@WebSocketGateway({ cors: true, origin: '*', namespace: 'backend' })
export class BackendSessionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  constructor(
    private readonly getSessionsUseCase: GetSessionsUseCase,
    private readonly startAssistanceUseCase: StartAssistanceUseCase,
    private readonly participantSocketMap: ParticipantSocketMapService,
    private readonly endAssistanceUseCase: EndAssistanceUseCase,
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

  @SubscribeMessage('endAssistance')
  async endAssistance(
    @MessageBody()
    data: {
      sessionId: string;
      isResolved: boolean;
      issueType: string;
    },
  ) {
    await this.endAssistanceUseCase.execute({
      sessionId: data.sessionId,
      isResolved: data.isResolved,
      issueType: data.issueType,
    });
  }

  @OnEvent('session.created')
  async handleSessionCreatedEvent(event: SessionCreatedEvent) {
    this.server.emit('session.created', event.session);
  }

  @OnEvent('assistance.ended.by.user')
  async handleAssistanceEndedByUserEvent(event: AssistanceEndedByUserEvent) {
    this.server.emit('assistance.ended.by.user', event.session);
  }

  @OnEvent('update.info.user')
  async handleUpdateInfoUserEvent(event: UpdateInfoUserEvent) {
    this.server.emit('update.info.user', event.session);
  }
}
