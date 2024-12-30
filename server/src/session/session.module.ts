import { Module } from '@nestjs/common';
import { SessionGateway } from './session.gateway';
import { NotifyModule } from '../notify/notify.module';
import { ClientJoinedQueueUseCase } from './use-cases/client-joined-queue.use-case';

@Module({
  imports: [NotifyModule],
  providers: [SessionGateway, ClientJoinedQueueUseCase],
})
export class ClientModule {}
