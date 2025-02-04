import { Session } from 'src/sessions/interfaces/session.interface';

export class AssistanceEndedByUserEvent {
  constructor(public readonly session: Session) {}
}
