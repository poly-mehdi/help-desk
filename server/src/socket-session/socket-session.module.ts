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
import { UpdateInfoUserUseCase } from './use-cases/update-info-user.use-case';
import { RejectSessionUseCase } from './use-cases/reject-session.use-case';
import { SessionRecallUseCase } from './use-cases/session-recall.use-case';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';
import { MailerService } from '@nestjs-modules/mailer';

@Module({
  imports: [
    NotifyModule,
    SessionsModule,
    HttpModule,
    WherebyModule,
    EmailModule,
  ],
  providers: [
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
  ],
})
export class SocketSessionModule {}
