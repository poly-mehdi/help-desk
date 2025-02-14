import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketsModule } from './sockets/sockets.module';
import { DatabaseModule } from './database/database.module';
import { SlackService } from './notify/providers/slack.service';
import { NotifyModule } from './notify/notify.module';
import { SessionsModule } from './sessions/sessions.module';
import { WherebyService } from './whereby/whereby.service';
import { WherebyModule } from './whereby/whereby.module';
import { SettingsModule } from './settings/settings.module';
import databaseConfig from './config/database.config';
import { EmailModule } from './email/email.module';
import appConfig from './config/app.config';
import slackConfig from './config/slack.config';
import frontendConfig from './config/frontend.config';
import wherebyConfig from './config/whereby.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        appConfig,
        slackConfig,
        frontendConfig,
        wherebyConfig,
      ],
    }),
    EventEmitterModule.forRoot(),
    SocketsModule,
    SessionsModule,
    HttpModule,
    NotifyModule,
    DatabaseModule,
    WherebyModule,
    SettingsModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService, SlackService, WherebyService],
})
export class AppModule {}
