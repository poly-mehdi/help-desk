import { HttpModule } from '@nestjs/axios';
import { Logger, Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';
import { SessionsModule } from 'src/sessions/sessions.module';
import { SettingsModule } from 'src/settings/settings.module';
import { WherebyModule } from 'src/whereby/whereby.module';
import { WherebyService } from 'src/whereby/whereby.service';
import { NotifyModule } from '../notify/notify.module';
import { ParticipantSocketMapService } from './services/participant-socket-map/participant-socket-map.service';
import { BackendSessionGateway } from './socket-backend.gateway';
import { SocketSessionGateway } from './socket-session.gateway';
import { CreateSessionUseCase } from './use-cases/create-session.use-case';
import { EndAssistanceByUserUseCase } from './use-cases/end-assistance-by-user.use-case';
import { EndAssistanceUseCase } from './use-cases/end-assistance.use-case';
import { GetSessionsUseCase } from './use-cases/get-sessions.use-case';
import { JoinSessionUseCase } from './use-cases/join-session.use-case';
import { RejectSessionUseCase } from './use-cases/reject-session.use-case';
import { SessionRecallUseCase } from './use-cases/session-recall.use-case';
import { StartAssistanceUseCase } from './use-cases/start-assistance.use-case';
import { UpdateInfoUserUseCase } from './use-cases/update-info-user.use-case';
import { UpdateVariableUseCase } from './use-cases/update-variable.use-case';
import { UseCaseBusService } from './services/use-case-bus.service';
import { GetSettingsUseCase } from './use-cases/get-settings.use-case';

@Module({
  imports: [
    NotifyModule,
    SessionsModule,
    HttpModule,
    WherebyModule,
    EmailModule,
    SettingsModule,
  ],
  providers: [
    UseCaseBusService,
    SocketSessionGateway,
    BackendSessionGateway,
    CreateSessionUseCase,
    StartAssistanceUseCase,
    EndAssistanceUseCase,
    ParticipantSocketMapService,
    JoinSessionUseCase,
    EndAssistanceByUserUseCase,
    GetSessionsUseCase,
    UpdateInfoUserUseCase,
    RejectSessionUseCase,
    SessionRecallUseCase,
    EmailService,
    WherebyService,
    UpdateVariableUseCase,
    GetSettingsUseCase,
  ],
})
export class SocketsModule {}
