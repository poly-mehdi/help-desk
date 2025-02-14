import { Session } from 'src/sessions/interfaces/session.interface';

export class AssistanceStartedEvent {
  constructor(
    public readonly session: Session,
    public readonly roomUrl: string,
  ) {}
}
