import { Module } from '@nestjs/common';
import { SocketSessionGateway } from './socket-session.gateway';
import { NotifyModule } from '../notify/notify.module';
import { CreateSessionUseCase } from './use-cases/create-session.use-case';
import { SessionsModule } from 'src/sessions/sessions.module';

@Module({
  imports: [NotifyModule, SessionsModule],
  providers: [SocketSessionGateway, CreateSessionUseCase],
})
export class SocketSessionModule {}
