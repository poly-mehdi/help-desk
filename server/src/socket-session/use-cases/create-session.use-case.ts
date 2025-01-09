import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SessionCreatedEvent } from '../events/session-created.event';
import { SessionsService } from '../../sessions/sessions.service';
import { Session } from '../../sessions/interfaces/session.interface';
import { ParticipantRole } from '../../sessions/models/participant-role.enum';

@Injectable()
export class CreateSessionUseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly sessionService: SessionsService,
  ) {}

  async execute(data: {
    firstName: string;
    lastName: string;
    email: string;
  }): Promise<Session> {
    let session = await this.sessionService.create(data);
    await this.sessionService.addParticipant(session.id, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: ParticipantRole.Customer,
    });
    session = await this.sessionService.findOne(session.id);

    this.eventEmitter.emit(
      'session.created',
      new SessionCreatedEvent(
        data.firstName,
        data.lastName,
        data.email,
        session,
      ),
    );
    return session;
  }
}
