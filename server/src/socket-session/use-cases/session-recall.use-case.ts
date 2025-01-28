import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { Session } from '../../sessions/interfaces/session.interface';
import { SessionStatus } from '../../sessions/models/session-status.enum';
import { SessionsService } from '../../sessions/sessions.service';
import { WherebyService } from '../../whereby/whereby.service';
import { WherebyMeetingResponse } from 'src/whereby/interfaces/whereby-meeting-response.interface';

@Injectable()
export class SessionRecallUseCase {
  constructor(
    private readonly mailService: MailerService,
    private readonly sessionService: SessionsService,
    private readonly wherebyService: WherebyService,
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

      await this.mailService.sendMail({
        from: 'Bench Data <sehad.mehdi@gmail.com>',
        to: sessionUpdated.participants[0].email,
        subject: 'Follow-Up on Your Support Request',
        // html: `<p>Hello ${sessionUpdated.participants[0].firstName},</p><p>We are following up on your support request. Please click on the following link to join the meeting: <a href="http://localhost:4000/session/${newSession.id}/${meeting.roomUrl}?participantId=${newSession.participants[0].id}">Join Meeting</a></p><p>Best regards,</p><p>Bench Data</p>`,
        text: 'Hello from HelpDesk',
        // text: `Hello ${sessionUpdated.participants[0].firstName},\n\nWe are following up on your support request. Please click on the following link to join the meeting: http://localhost:4000/session/${newSession.id}/${meeting.roomUrl}?participantId=${newSession.participants[0].id}\n\nBest regards,\nBench Data`,
      });

      return sessionUpdated;
    } catch (error) {
      throw new Error('Failed to recall session');
    }
  }
}
