import { Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ParticipantJoinedEvent } from './events/participant-joined.event';
import { ParticipantSocketMapService } from './services/participant-socket-map/participant-socket-map.service';
import { CreateSessionUseCase } from './use-cases/create-session.use-case';
import { EndAssistanceByUserUseCase } from './use-cases/end-assistance-by-user.use-case';
import { EndAssistanceUseCase } from './use-cases/end-assistance.use-case';
import { JoinSessionUseCase } from './use-cases/join-session.use-case';
import { AssistanceStartedEvent } from './events/assistance-started.event';
import { Participant } from 'src/sessions/interfaces/participant.interface';

@WebSocketGateway({ cors: true, origin: '*', namespace: 'session' })
export class SocketSessionGateway implements OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  constructor(
    private readonly createSessionUseCase: CreateSessionUseCase,
    private readonly joinSessionUseCase: JoinSessionUseCase,
    private readonly endAssistanceUseCase: EndAssistanceUseCase,
    private readonly participantSocketMap: ParticipantSocketMapService,
    private readonly endAssistanceByUser: EndAssistanceByUserUseCase,
  ) {}

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
      appName?: string;
    },
  ) {
    const session = await this.createSessionUseCase.execute({ ...data });

    const event = 'createSession';
    return {
      event,
      data: {
        sessionId: session.id,
        participantId: session.participants[0].id,
      },
    };
  }

  @SubscribeMessage('joinSession')
  async joinSession(
    @MessageBody()
    data: {
      sessionId: string;
      participantId: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    this.participantSocketMap.setParticipantSocket(
      data.participantId,
      client.id,
    );
    this.joinSessionUseCase.execute(data);
  }

  @SubscribeMessage('leaveSession')
  async leaveSession(
    @MessageBody()
    data: {
      participantId: string;
    },
  ) {
    this.participantSocketMap.deleteParticipantSocket(data.participantId);
  }

  @SubscribeMessage('endAssistance')
  async endAssistance(
    @MessageBody()
    data: {
      sessionId: string;
      isResolved: boolean;
    },
    @ConnectedSocket() client: Socket,
  ) {
    Logger.log('Ending assistance for session');
    await this.endAssistanceUseCase.execute({
      sessionId: data.sessionId,
      isResolved: data.isResolved,
    });
  }

  @SubscribeMessage('endAssistanceByUser')
  async endAssistanceFromContact(
    @MessageBody()
    data: {
      participantId: string;
      sessionId: string;
      phone: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    Logger.log('Ending assistance for session from contact');
    this.participantSocketMap.deleteParticipantSocket(data.participantId);
    this.endAssistanceByUser.execute({
      sessionId: data.sessionId,
      participantId: data.participantId,
      phone: data.phone,
    });
  }
  @OnEvent('participant.joined')
  async handleParticipantJoinedEvent(event: ParticipantJoinedEvent) {
    const { roomUrl, sessionId, participantId } = event;
    const socketId = this.participantSocketMap.getSocketId(participantId);
    const timeoutDuration = 30000;
    this.server.to(socketId).emit('participant.joined', {
      roomUrl,
      sessionId,
      timeoutDuration,
    });
  }

  @OnEvent('assistance.started')
  async handleAssistanceStartedEvent(event: AssistanceStartedEvent) {
    const { session, roomUrl } = event;
    const participants = session.participants;

    participants.forEach((participant: Participant) => {
      const socketId = this.participantSocketMap.getSocketId(participant.id);
      this.server.to(socketId).emit('assistance.started', {
        roomUrl: roomUrl,
      });
    });
  }

  @OnEvent('assistance.ended')
  async handleAssistanceEndedEvent(event) {}
}
