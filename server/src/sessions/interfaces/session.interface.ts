import { SessionStatus } from '../models/session-status.enum';
import { Participant } from './participant.interface';

export interface Session {
  id: string;
  appName?: string;
  status: SessionStatus;
  meetingId?: string;
  roomUrl?: string;
  participants?: Participant[];
  createdAt: Date;
  updatedAt: Date;
}
