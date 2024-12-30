import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './session/session.module';
import { DatabaseModule } from './database/database.module';
import { SlackService } from './notify/providers/slack.service';
import { NotifyController } from './notify/notify.controller';
import { NotifyModule } from './notify/notify.module';
import { UsersModule } from './users/users.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    EventEmitterModule.forRoot(),
    ClientModule,
    UsersModule,
    HttpModule,
    NotifyModule,
    DatabaseModule,
  ],
  controllers: [AppController, NotifyController],
  providers: [AppService, SlackService],
})
export class AppModule {}
