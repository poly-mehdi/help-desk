import { Injectable, Logger } from '@nestjs/common';
import { SessionsService } from '../../sessions/sessions.service';
import { SessionStatus } from '../../sessions/models/session-status.enum';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EndAssistanceUseCase {
  constructor(
    private readonly session: SessionsService,
    private httpService: HttpService,
    private readonly configService: ConfigService,
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
      const url = `${this.configService.get<string>('whereby.api_url')}/${meetingId}`;
      const response = await lastValueFrom(
        this.httpService.delete(url, {
          headers: {
            Authorization: `Bearer ${this.configService.get<string>('whereby.api_key')}`,
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
