import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { UsersModule } from './users/users.module';
import { HttpModule } from '@nestjs/axios';
import { SlackService } from './slack/slack.service';
import { SlackController } from './slack/slack.controller';

@Module({
  imports: [ChatModule, UsersModule, HttpModule],
  controllers: [AppController, SlackController],
  providers: [AppService, SlackService],
})
export class AppModule {}
