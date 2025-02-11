export class ParticipantJoinedEvent {
  constructor(
    public readonly roomUrl: string,
    public readonly sessionId: string,
    public readonly participantId: string,
    public readonly name: string,
    public readonly delay: number,
  ) {}
}
