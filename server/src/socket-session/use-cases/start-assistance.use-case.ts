import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { WherebyMeetingResponse } from '../../whereby/interfaces/whereby-meeting-response.interface';
import { WherebyService } from '../../whereby/whereby.service';
import { SessionStatus } from '../../sessions/models/session-status.enum';
import { SessionsService } from '../../sessions/sessions.service';

@Injectable()
export class StartAssistanceUseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly session: SessionsService,
    private readonly wherebyService: WherebyService,
  ) {}

  async execute(data: { sessionId: string }): Promise<void> {
    try {
      const meeting: WherebyMeetingResponse =
        await this.wherebyService.createMeeting();
      const updatedSession = await this.session.update(data.sessionId, {
        status: SessionStatus.InProgress,
        meetingId: meeting.meetingId,
        roomUrl: meeting.roomUrl,
      });
      this.eventEmitter.emit('assistance.started', {
        session: updatedSession,
        roomUrl: meeting.roomUrl,
      });
    } catch (error) {
      Logger.error('Failed to create meeting', error);
      await this.session.update(data.sessionId, {
        status: SessionStatus.Pending,
      });
      throw new Error('Failed to create meeting');
    }
  }
}
