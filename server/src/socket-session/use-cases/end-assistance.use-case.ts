import { Injectable, Logger } from '@nestjs/common';
import { SessionsService } from '../../sessions/sessions.service';
import { SessionStatus } from '../../sessions/models/session-status.enum';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class EndAssistanceUseCase {
  constructor(
    private readonly session: SessionsService,
    private httpService: HttpService,
  ) {}

  async execute(data: {
    sessionId: string;
    isResolved: boolean;
    issueType: string;
    description: string;
  }): Promise<void> {
    const updatedSession = await this.session.update(data.sessionId, {
      status: SessionStatus.Completed,
      isResolved: data.isResolved,
      issueType: data.issueType,
      description: data.description,
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
      Logger.error('Failed to delete meeting', error);
      await this.session.update(data.sessionId, {
        status: SessionStatus.Pending,
      });
      throw new Error('Failed to delete meeting');
    }
  }
}
