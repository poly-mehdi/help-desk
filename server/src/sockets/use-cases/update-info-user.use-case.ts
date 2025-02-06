import { Injectable, Logger } from '@nestjs/common';
import { SessionsService } from '../../sessions/sessions.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UpdateInfoUserUseCase {
  constructor(
    private readonly session: SessionsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(data: {
    sessionId: string;
    participantId: string;
    phone: string;
  }) {
    const sessionUpdated = await this.session.updateParticipant(
      data.sessionId,
      data.participantId,
      {
        phone: data.phone,
      },
    );
    this.eventEmitter.emit('update.info.user', {
      session: sessionUpdated,
    });
  }
}
