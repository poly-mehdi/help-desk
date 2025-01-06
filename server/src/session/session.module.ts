import { Module } from '@nestjs/common';
import { SessionGateway } from './session.gateway';
import { NotifyModule } from '../notify/notify.module';
import { CreateSessionUseCase } from './use-cases/create-session.use-case';

@Module({
  imports: [NotifyModule],
  providers: [SessionGateway, CreateSessionUseCase],
})
export class ClientModule {}
