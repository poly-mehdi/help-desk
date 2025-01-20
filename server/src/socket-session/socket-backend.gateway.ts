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
import { Layout } from 'src/layouts/interfaces/layout.interface';
import { Participant } from 'src/sessions/interfaces/participant.interface';
import { AssistanceStartedEvent } from './events/assistance-started.event';
import { SessionCreatedEvent } from './events/session-created.event';
import { ParticipantSocketMapService } from './services/participant-socket-map/participant-socket-map.service';
import { GetLayoutsUseCase } from './use-cases/get-layouts.use-case';
import { GetSessionsUseCase } from './use-cases/get-sessions.use-case';
import { SaveLayoutsUseCase } from './use-cases/save-layouts.use-case';
import { StartAssistanceUseCase } from './use-cases/start-assistance.use-case';

@WebSocketGateway({ cors: true, origin: '*', namespace: 'backend' })
export class BackendSessionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  constructor(
    private readonly getSessionsUseCase: GetSessionsUseCase,
    private readonly getLayoutsUseCase: GetLayoutsUseCase,
    private readonly startAssistanceUseCase: StartAssistanceUseCase,
    private readonly participantSocketMap: ParticipantSocketMapService,
    private readonly saveLayoutsUseCase: SaveLayoutsUseCase,
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

  @SubscribeMessage('getLayouts')
  async getLayout(
    @MessageBody()
    data: {
      id: string;
    },
  ) {
    const layouts = await this.getLayoutsUseCase.execute(data.id);
    return layouts;
  }

  @SubscribeMessage('saveLayouts')
  async saveLayouts(
    @MessageBody()
    data: {
      id: string;
      page: string;
      updatedLayouts: Layout[];
    },
  ) {
    await this.saveLayoutsUseCase.execute(data);
    // TODO: Return if the layouts have been saved and display the right toast
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
