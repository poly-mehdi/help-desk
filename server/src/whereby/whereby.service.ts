import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { WherebyMeetingResponse } from './interfaces/whereby-meeting-response.interface';

@Injectable()
export class WherebyService {
  constructor(private readonly httpService: HttpService) {}

  async createMeeting(): Promise<WherebyMeetingResponse> {
    const meetingData = {
      endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
      isLocked: false,
      roomNamePrefix: '',
      roomNamePattern: 'uuid',
      roomMode: 'normal',
      fields: ['hostRoomUrl'],
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post(process.env.WHEREBY_API_URL, meetingData, {
          headers: {
            Authorization: `Bearer ${process.env.WHEREBY_API_KEY}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to create meeting');
    }
  }
}
