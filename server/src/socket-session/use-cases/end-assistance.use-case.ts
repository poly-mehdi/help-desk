import { Injectable, Logger } from '@nestjs/common';
import { SessionsService } from '../../sessions/sessions.service';
import { SessionStatus } from '../../sessions/models/session-status.enum';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EndAssistanceUseCase {
  constructor(
    private readonly session: SessionsService,
    private httpService: HttpService,
    private eventEmitter: EventEmitter2,
  ) {}

  async execute(data: {
    sessionId: string;
    isResolved: boolean;
    issueType: string;
  }): Promise<void> {
    Logger.log(`Ending assistance for session ${data.sessionId}`);
    const updatedSession = await this.session.update(data.sessionId, {
      status: SessionStatus.Completed,
      isResolved: data.isResolved,
      issueType: data.issueType,
    });
    const meetingId = updatedSession.meetingId;
    try {
      const url = `${process.env.WHEREBY_API_URL}/${meetingId}`;
      const response = await lastValueFrom(
        this.httpService.delete(url, {
          headers: {
            Authorization: `Bearer ${process.env.WHEREBY_API_KEY}`,
          },
        }),
      );
    } catch (error) {
      console.error('Failed to delete meeting', error);
      await this.session.update(data.sessionId, {
        status: SessionStatus.Pending,
      });
      throw new Error('Failed to delete meeting');
    }
  }
}
