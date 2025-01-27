import { SessionStatus } from '../models/session-status.enum';
import { Participant } from './participant.interface';

export interface Session {
  id: string;
  status: SessionStatus;
  isResolved: boolean;
  appName?: string;
  meetingId?: string;
  roomUrl?: string;
  hostRoomUrl?: string;
  participants?: Participant[];
  createdAt: Date;
  updatedAt: Date;
  language?: string;
  issueType?: string;
}
