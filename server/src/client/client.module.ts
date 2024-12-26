import { Module } from '@nestjs/common';
import { ClientGateway } from './client.gateway';
import { SlackModule } from '../slack/slack.module';

@Module({
  imports: [SlackModule],
  providers: [ClientGateway],
})
export class ClientModule {}
