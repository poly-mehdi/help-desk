import { Injectable } from '@nestjs/common';
import { SessionsService } from '../../sessions/sessions.service';
import { SessionStatus } from '../../sessions/models/session-status.enum';
import { Session } from '../../sessions/interfaces/session.interface';

@Injectable()
export class RejectSessionUseCase {
  constructor(private readonly session: SessionsService) {}
  async execute(data: { sessionId: string }): Promise<Session> {
    const updatedSession = await this.session.update(data.sessionId, {
      status: SessionStatus.Rejected,
    });
    return updatedSession;
  }
}
