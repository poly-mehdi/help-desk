import { Module } from '@nestjs/common';
import { SocketSessionGateway } from './socket-session.gateway';
import { NotifyModule } from '../notify/notify.module';
import { CreateSessionUseCase } from './use-cases/create-session.use-case';
import { SessionsModule } from 'src/sessions/sessions.module';
import { HttpModule } from '@nestjs/axios';
import { StartAssistanceUseCase } from './use-cases/start-assistance.use-case';

@Module({
  imports: [NotifyModule, SessionsModule, HttpModule],
  providers: [
    SocketSessionGateway,
    CreateSessionUseCase,
    StartAssistanceUseCase,
  ],
})
export class SocketSessionModule {}
