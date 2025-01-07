import { Injectable, Logger } from '@nestjs/common';
import { SessionsService } from '../../sessions/sessions.service';
import { SessionStatus } from '../../sessions/schema/session-status.enum';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class EndAssistanceUseCase {
  constructor(
    private readonly session: SessionsService,
    private httpService: HttpService,
  ) {}

  async execute(data: {
    firstName: string;
    lastName: string;
    email: string;
    sessionId: string;
    meetingId: string;
  }): Promise<void> {
    const updatedSession = await this.session.update(data.sessionId, {
      status: SessionStatus.Completed,
    });

    try {
      const url = `${process.env.WHEREBY_API_URL}/${data.meetingId}`;
      const response = await lastValueFrom(
        this.httpService.delete(url, {
          headers: {
            Authorization: `Bearer ${process.env.WHEREBY_API_KEY}`,
          },
        }),
      );
      Logger.log('Meeting ended', response.data);
    } catch (error) {
      console.error('Failed to delete meeting', error);
      await this.session.update(data.sessionId, {
        status: SessionStatus.Pending,
      });
      throw new Error('Failed to delete meeting');
    }
  }
}
