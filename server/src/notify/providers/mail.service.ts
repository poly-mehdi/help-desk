import { Logger } from '@nestjs/common';
import { INotifyService } from '../interfaces/notify-service.interface';

export class MailService implements INotifyService {
  async sendNotification(message) {
    Logger.log(`Sending email notification: ${message}`);
  }
}
