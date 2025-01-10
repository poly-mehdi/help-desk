import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Session } from '../../sessions/interfaces/session.interface';
import { SessionsService } from '../../sessions/sessions.service';

@Injectable()
export class JoinSessionUseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly sessionService: SessionsService,
  ) {}

  async execute(data: {
    sessionId: string;
    participantId: string;
  }): Promise<void> {
    const session: Session = await this.sessionService.findOne(data.sessionId);

    this.eventEmitter.emit('participant.joined', {
      roomUrl: session.roomUrl,
      sessionId: data.sessionId,
      participantId: data.participantId,
    });
  }
}
