import { Injectable, Logger } from '@nestjs/common';
import { Session } from '../../sessions/interfaces/session.interface';
import { SessionStatus } from '../../sessions/models/session-status.enum';
import { SessionsService } from '../../sessions/sessions.service';
import { WherebyService } from '../../whereby/whereby.service';
import { WherebyMeetingResponse } from '../../whereby/interfaces/whereby-meeting-response.interface';
import { EmailService } from '../../email/email.service';

@Injectable()
export class SessionRecallUseCase {
  private readonly logger = new Logger(SessionRecallUseCase.name);
  constructor(
    private readonly sessionService: SessionsService,
    private readonly wherebyService: WherebyService,
    private readonly emailService: EmailService,
  ) {}
  async execute(data: { session: Session }): Promise<Session> {
    try {
      await this.sessionService.update(data.session.id, {
        status: SessionStatus.Recalled,
      });

      const meeting: WherebyMeetingResponse =
        await this.wherebyService.createMeeting();

      const dto = {
        status: SessionStatus.InProgress,
        isResolved: false,
        appName: data.session.appName,
      };
      const newSession = await this.sessionService.create(dto);

      await this.sessionService.addParticipant(
        newSession.id,
        data.session.participants[0],
      );

      const sessionUpdated = await this.sessionService.update(newSession.id, {
        meetingId: meeting.meetingId,
        roomUrl: meeting.roomUrl,
        hostRoomUrl: meeting.hostRoomUrl,
      });

      const url = `${process.env.FRONTEND_URL}/session/${sessionUpdated.id}?participant=${sessionUpdated.participants[0].id}`;

      await this.emailService.sendRecallMail(
        sessionUpdated.participants[0].email,
        sessionUpdated.participants[0].firstName,
        url,
      );
      return sessionUpdated;
    } catch (error) {
      this.logger.error(
        'Error occurred during session recall process:',
        error.stack,
      );
      throw new Error(`Failed to recall session: ${error.message}`);
    }
  }
}
