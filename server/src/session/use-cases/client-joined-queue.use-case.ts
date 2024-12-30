import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SessionCreatedEvent } from '../events/session-created.event';

@Injectable()
export class ClientJoinedQueueUseCase {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async execute(data: {
    firstName: string;
    lastName: string;
    email: string;
    sessionId: string;
  }): Promise<void> {
    this.eventEmitter.emit(
      'session.created',
      new SessionCreatedEvent(
        data.firstName,
        data.lastName,
        data.email,
        data.sessionId,
      ),
    );
  }
}
