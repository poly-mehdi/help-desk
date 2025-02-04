import { Injectable } from '@nestjs/common';
import { Session } from '../../sessions/interfaces/session.interface';
import { SessionsService } from '../../sessions/sessions.service';

@Injectable()
export class GetSessionsUseCase {
  constructor(private readonly sessionService: SessionsService) {}

  async execute(): Promise<Session[]> {
    const sessions = await this.sessionService.findAll();
    return sessions;
  }
}
