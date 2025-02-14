import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { WherebyMeetingResponse } from '../../whereby/interfaces/whereby-meeting-response.interface';
import { WherebyService } from '../../whereby/whereby.service';
import { SessionStatus } from '../../sessions/models/session-status.enum';
import { SessionsService } from '../../sessions/sessions.service';
import { Session } from 'src/sessions/interfaces/session.interface';

@Injectable()
export class StartAssistanceUseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly sessionService: SessionsService,
    private readonly wherebyService: WherebyService,
  ) {}

  async execute(data: { sessionId: string }): Promise<string> {
    try {
      const session = await this.sessionService.findOne(data.sessionId);

      if (session.status !== SessionStatus.Pending) {
        return undefined;
      }

      let meeting: WherebyMeetingResponse;

      if (!session.meetingId) {
        meeting = await this.wherebyService.createMeeting();
      } else {
        meeting = {
          meetingId: session.meetingId,
          roomUrl: session.roomUrl,
          hostRoomUrl: session.hostRoomUrl,
          startDate: '',
          endDate: '',
          roomName: '',
        };
      }

      const updatedSession: Session = await this.sessionService.update(
        data.sessionId,
        {
          status: SessionStatus.InProgress,
          meetingId: meeting.meetingId,
          roomUrl: meeting.roomUrl,
          hostRoomUrl: meeting.hostRoomUrl,
          startTime: new Date(),
        },
      );
      this.eventEmitter.emit('assistance.started', {
        session: updatedSession,
        roomUrl: meeting.roomUrl,
      });
      return meeting.hostRoomUrl;
    } catch (error) {
      Logger.error('Failed to create meeting', error);
      await this.sessionService.update(data.sessionId, {
        status: SessionStatus.Pending,
      });
      throw new Error('Failed to create meeting');
    }
  }
}
