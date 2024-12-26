import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SlackConfig } from './slack.config';

@Injectable()
export class SlackService {
  constructor(private httpService: HttpService) {}

  async postToSlack(message: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          SlackConfig.url,
          {
            username: SlackConfig.botName,
            icon_emoji: SlackConfig.icon,
            channel: SlackConfig.channel,
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
