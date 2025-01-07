import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SessionsService } from '../../sessions/sessions.service';
import { SessionStatus } from '../../sessions/schema/session-status.enum';

@Injectable()
export class StartAssistanceUseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly session: SessionsService,
  ) {}

  async execute(data: {
    firstName: string;
    lastName: string;
    email: string;
    sessionId: string;
  }): Promise<void> {
    const updatedSession = await this.session.update(data.sessionId, {
      status: SessionStatus.InProgress,
    });
    this.eventEmitter.emit('start.assistance', data);
  }
}
