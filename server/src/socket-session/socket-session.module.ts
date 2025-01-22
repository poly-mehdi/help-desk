import { Module } from '@nestjs/common';
import { SocketSessionGateway } from './socket-session.gateway';
import { NotifyModule } from '../notify/notify.module';
import { CreateSessionUseCase } from './use-cases/create-session.use-case';
import { SessionsModule } from 'src/sessions/sessions.module';
import { HttpModule } from '@nestjs/axios';
import { StartAssistanceUseCase } from './use-cases/start-assistance.use-case';
import { EndAssistanceUseCase } from './use-cases/end-assistance.use-case';
import { ParticipantSocketMapService } from './services/participant-socket-map/participant-socket-map.service';
import { JoinSessionUseCase } from './use-cases/join-session.use-case';
import { WherebyModule } from 'src/whereby/whereby.module';
import { WherebyService } from 'src/whereby/whereby.service';
import { EndAssistanceByUserUseCase } from './use-cases/end-assistance-by-user.use-case';
import { BackendSessionGateway } from './socket-backend.gateway';
import { GetSessionsUseCase } from './use-cases/get-sessions.use-case';

@Module({
  imports: [
    NotifyModule,
    SessionsModule,
    HttpModule,
    WherebyModule,
  ],
  providers: [
    SocketSessionGateway,
    BackendSessionGateway,
    CreateSessionUseCase,
    StartAssistanceUseCase,
    EndAssistanceUseCase,
    ParticipantSocketMapService,
    JoinSessionUseCase,
    WherebyService,
    EndAssistanceByUserUseCase,
    GetSessionsUseCase,
  ],
})
export class SocketSessionModule {}
