import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SessionCreatedEvent } from '../events/session-created.event';
import { SessionsService } from '../../sessions/sessions.service';
import { Session } from '../../sessions/interfaces/session.interface';

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
    const session = await this.sessionService.create(data);
    this.eventEmitter.emit(
      'session.created',
      new SessionCreatedEvent(
        data.firstName,
        data.lastName,
        data.email,
        session.id,
      ),
    );
    return session;
  }
}
