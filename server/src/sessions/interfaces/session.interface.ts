import { Document } from 'mongoose';
import { SessionStatus } from '../schema/session-status.enum';

export interface Session {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  appName?: string;
  status: SessionStatus;
  createdAt: Date;
  updatedAt: Date;
}
