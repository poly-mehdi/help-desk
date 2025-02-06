import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendRecallMail(mailAddress: string, name: string, url: string) {
    Logger.log(`Sending recall email to ${mailAddress}`);
    await this.mailerService.sendMail({
      to: mailAddress,
      subject: 'Follow-Up on Your Support Request',
      template: './recall',
      context: {
        name,
        url,
      },
    });
  }
}
