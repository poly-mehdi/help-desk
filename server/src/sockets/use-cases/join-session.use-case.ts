import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Session } from '../../sessions/interfaces/session.interface';
import { SessionsService } from '../../sessions/sessions.service';
import { SettingsService } from '../../settings/services/settings.service';

@Injectable()
export class JoinSessionUseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly sessionService: SessionsService,
    private readonly settingsService: SettingsService,
  ) {}

  async execute(data: {
    sessionId: string;
    participantId: string;
  }): Promise<void> {
    const session: Session = await this.sessionService.findOne(data.sessionId);
    const name = `${session.participants[0].firstName} ${session.participants[0].lastName}`;
    const delay = (await this.settingsService.get('delay')) as number;

    this.eventEmitter.emit('participant.joined', {
      roomUrl: session.roomUrl,
      sessionId: data.sessionId,
      participantId: data.participantId,
      delay,
      name,
    });
  }
}
