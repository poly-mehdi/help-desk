import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { UsersModule } from './users/users.module';
import { HttpModule } from '@nestjs/axios';
import { SlackService } from './slack/slack.service';
import { SlackController } from './slack/slack.controller';
import { SlackModule } from './slack/slack.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientModule,
    UsersModule,
    HttpModule,
    SlackModule,
    DatabaseModule,
  ],
  controllers: [AppController, SlackController],
  providers: [AppService, SlackService],
})
export class AppModule {}
