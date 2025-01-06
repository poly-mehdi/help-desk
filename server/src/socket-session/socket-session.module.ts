import { Module } from '@nestjs/common';
import { SocketSessionGateway } from './socket-session.gateway';
import { NotifyModule } from '../notify/notify.module';
import { CreateSessionUseCase } from './use-cases/create-session.use-case';

@Module({
  imports: [NotifyModule],
  providers: [SocketSessionGateway, CreateSessionUseCase],
})
export class SocketSessionModule {}
