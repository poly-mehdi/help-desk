import { Inject, Injectable } from '@nestjs/common';
import { NOTIFY_SERVICE } from '../constants';
import { INotifyService } from '../interfaces/notify-service.interface';
import { OnEvent } from '@nestjs/event-emitter';
import { SessionCreatedEvent } from 'src/socket-session/events/session-created.event';
import { AssistanceStartedEvent } from 'src/socket-session/events/assistance-started.event';

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
    const message = `Assistance started for ${event.firstName} ${event.lastName} (${event.email}). Meeting URL: ${event.meetingUrl}`;
    await this.notifyService.sendNotification(message);
  }
}
