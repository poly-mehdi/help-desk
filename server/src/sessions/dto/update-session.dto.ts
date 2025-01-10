import { Participant } from '../interfaces/participant.interface';

export class UpdateSessionDto {
  status?: string;
  participants?: Participant[];
  meetingId?: string;
  roomUrl?: string;
}
