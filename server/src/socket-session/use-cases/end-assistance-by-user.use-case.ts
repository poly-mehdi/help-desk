import { Injectable } from '@nestjs/common';
import { SessionStatus } from '../../sessions/models/session-status.enum';
import { SessionsService } from '../../sessions/sessions.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EndAssistanceByUserUseCase {
  constructor(
    private readonly session: SessionsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(data: { sessionId: string; participantId: string }) {
    const updatedSession = await this.session.update(data.sessionId, {
      status: SessionStatus.OnHold,
    });
    this.eventEmitter.emit('assistance.ended.by.user', {
      session: updatedSession,
    });
  }
}
