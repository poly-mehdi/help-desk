import { Participant } from '../interfaces/participant.interface';

export class UpdateSessionDto {
  status?: string;
  participants?: Participant[];
  meetingId?: string;
  roomUrl?: string;
  hostRoomUrl?: string;
  isResolved?: boolean;
  issueType?: string;
  description?: string;
  rejectedReason?: string;
  startTime?: Date;
  duration?: number;
}
