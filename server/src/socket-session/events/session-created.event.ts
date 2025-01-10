import { Session } from 'src/sessions/interfaces/session.interface';

export class SessionCreatedEvent {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly session: Session,
  ) {}
}
