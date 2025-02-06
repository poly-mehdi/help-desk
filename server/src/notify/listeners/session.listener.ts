import { Inject, Injectable } from '@nestjs/common';
import { NOTIFY_SERVICE } from '../constants';
import { INotifyService } from '../interfaces/notify-service.interface';
import { OnEvent } from '@nestjs/event-emitter';
import { SessionCreatedEvent } from 'src/sockets/events/session-created.event';
import { AssistanceStartedEvent } from 'src/sockets/events/assistance-started.event';

@Injectable()
export class SessionListener {
  constructor(
    @Inject(NOTIFY_SERVICE) private readonly notifyService: INotifyService,
  ) {}

  @OnEvent('session.created')
  async handleSessionCreatedEvent(event: SessionCreatedEvent) {
    const message = `Client ${event.firstName} ${event.lastName} (${event.email}) has joined the queue.`;
    await this.notifyService.sendNotification(message);
  }

  @OnEvent('assistance.started')
  async handleAssistanceStartedEvent(event: AssistanceStartedEvent) {
    const { session } = event;
    const message = `Assistance started for ${session.participants[0].firstName} ${session.participants[0].lastName} (${session.participants[0].email}).`;
    await this.notifyService.sendNotification(message);
  }
}
