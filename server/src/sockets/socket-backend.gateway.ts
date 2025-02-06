import { OnEvent } from '@nestjs/event-emitter';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Session } from 'src/sessions/interfaces/session.interface';
import { AssistanceEndedByUserEvent } from './events/assistance-ended-by-user.event';
import { SessionCreatedEvent } from './events/session-created.event';
import { UpdateInfoUserEvent } from './events/update-info-user.event';
import { UseCaseBusService } from './services/use-case-bus.service';
import { EndAssistanceUseCase } from './use-cases/end-assistance.use-case';
import { GetSessionsUseCase } from './use-cases/get-sessions.use-case';
import { RejectSessionUseCase } from './use-cases/reject-session.use-case';
import { SessionRecallUseCase } from './use-cases/session-recall.use-case';
import { StartAssistanceUseCase } from './use-cases/start-assistance.use-case';
import { UpdateVariableUseCase } from './use-cases/update-variable.use-case';
import { GetSettingsUseCase } from './use-cases/get-settings.use-case';

@WebSocketGateway({ cors: true, origin: '*', namespace: 'backend' })
export class BackendSessionGateway {
  @WebSocketServer() server: Server;
  constructor(
    private readonly useCaseBusService: UseCaseBusService,
    private readonly getSessionsUseCase: GetSessionsUseCase,
    private readonly startAssistanceUseCase: StartAssistanceUseCase,
    private readonly endAssistanceUseCase: EndAssistanceUseCase,
    private readonly rejectSessionUseCase: RejectSessionUseCase,
    private readonly sessionRecallUseCase: SessionRecallUseCase,
    private readonly updateVariableUseCase: UpdateVariableUseCase,
    private readonly getSettingsUseCase: GetSettingsUseCase,
  ) {}

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
      description: string;
    },
  ) {
    await this.endAssistanceUseCase.execute({
      sessionId: data.sessionId,
      isResolved: data.isResolved,
      issueType: data.issueType,
      description: data.description,
    });
  }

  @SubscribeMessage('rejectSession')
  async rejectSession(
    @MessageBody()
    data: {
      sessionId: string;
    },
  ) {
    const updatedSession = await this.rejectSessionUseCase.execute(data);
    const event = 'session.rejected';
    return {
      event: event,
      data: {
        session: updatedSession,
      },
    };
  }

  @SubscribeMessage('sessionRecall')
  async sessionRecall(
    @MessageBody() data: { session: Session },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const newSession = await this.sessionRecallUseCase.execute(data);
      const event = 'session.recalled';

      client.emit(event, {
        session: newSession,
      });
    } catch (error) {
      client.emit('session.recall.failed');
    }
  }

  @SubscribeMessage('getSettings')
  async getSettings() {
    const settings = await this.getSettingsUseCase.execute();
    const event = 'getSettings';
    return {
      event,
      data: {
        settings: settings,
      },
    };
  }

  @SubscribeMessage('updateVariable')
  async updateVariable(
    @MessageBody()
    data: {
      name: string;
      value: string;
    },
  ) {
    await this.useCaseBusService.execute(UpdateVariableUseCase, data);
    // await this.updateVariableUseCase.execute(data);
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
