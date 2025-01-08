import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SessionsService } from '../../sessions/sessions.service';
import { SessionStatus } from '../../sessions/schema/session-status.enum';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class StartAssistanceUseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly session: SessionsService,
    private httpService: HttpService,
  ) {}

  async execute(data: { sessionId: string }): Promise<string> {
    const updatedSession = await this.session.update(data.sessionId, {
      status: SessionStatus.InProgress,
    });
    const meetingData = {
      endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
      isLocked: false,
      roomNamePrefix: '',
      roomNamePattern: 'uuid',
      roomMode: 'normal',
      fields: [],
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post(process.env.WHEREBY_API_URL, meetingData, {
          headers: {
            Authorization: `Bearer ${process.env.WHEREBY_API_KEY}`,
          },
        }),
      );
      console.log('meeting response', response.data);
      this.eventEmitter.emit('assistance.started', {
        ...data,
        meetingUrl: response.data.roomUrl,
      });
      return response.data.roomUrl;
    } catch (error) {
      console.error('Failed to create meeting', error);
      await this.session.update(data.sessionId, {
        status: SessionStatus.Pending,
      });
      throw new Error('Failed to create meeting');
    }
  }
}
