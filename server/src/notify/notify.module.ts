import { Module } from '@nestjs/common';
import { SlackService } from './providers/slack.service';
import { HttpModule } from '@nestjs/axios';
import { MailService } from './providers/mail.service';
import { NOTIFY_SERVICE } from './constants';
import { SessionListener } from './listeners/session.listener';

@Module({
  imports: [HttpModule],
  providers: [
    SlackService,
    MailService,
    { provide: NOTIFY_SERVICE, useExisting: SlackService },
    SessionListener,
  ],
  exports: [NOTIFY_SERVICE],
})
export class NotifyModule {}
