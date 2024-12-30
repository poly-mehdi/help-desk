import { Inject, Injectable } from '@nestjs/common';
import { NOTIFY_SERVICE } from '../constants';
import { INotifyService } from '../interfaces/notify-service.interface';
import { OnEvent } from '@nestjs/event-emitter';
import { SessionCreatedEvent } from 'src/session/events/session-created.event';

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
}
