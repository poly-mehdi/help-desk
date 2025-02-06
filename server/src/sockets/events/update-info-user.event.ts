import { Session } from 'src/sessions/interfaces/session.interface';

export class UpdateInfoUserEvent {
  constructor(public readonly session: Session) {}
}
