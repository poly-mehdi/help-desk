import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { INotifyService } from '../interfaces/notify-service.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SlackService implements INotifyService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async sendNotification(message: string): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          this.configService.get<string>('slack.url'),
          {
            username: this.configService.get<string>('slack.botName'),
            icon_emoji: this.configService.get<string>('slack.icon'),
            channel: this.configService.get<string>('slack.channel'),
            text: message,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
            },
          },
        ),
      );

      if (!response.data.ok) {
        throw new HttpException(
          `Failed to send Slack message, details: ${response.data.error}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return response.data.message;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Failed to send Slack message, details: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
