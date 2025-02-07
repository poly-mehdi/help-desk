import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { WherebyMeetingResponse } from './interfaces/whereby-meeting-response.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WherebyService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async createMeeting(): Promise<WherebyMeetingResponse> {
    const meetingData = {
      endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 2),
      isLocked: false,
      roomNamePrefix: '',
      roomNamePattern: 'uuid',
      roomMode: 'normal',
      fields: ['hostRoomUrl'],
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post(
          this.configService.get<string>('whereby.api_url'),
          meetingData,
          {
            headers: {
              Authorization: `Bearer ${this.configService.get<string>('whereby.api_key')}`,
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to create meeting');
    }
  }
}
