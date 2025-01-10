import { Injectable } from '@nestjs/common';
import { SessionStatus } from '../../sessions/models/session-status.enum';
import { SessionsService } from '../../sessions/sessions.service';

@Injectable()
export class EndAssistanceByUserUseCase {
  constructor(private readonly session: SessionsService) {}

  async execute(data: {
    sessionId: string;
    participantId: string;
    phone: string;
  }) {
    const updatedSession = await this.session.update(data.sessionId, {
      status: SessionStatus.OnHold,
    });
    this.session.updateParticipant(data.sessionId, data.participantId, {
      phone: data.phone,
    });
  }
}
