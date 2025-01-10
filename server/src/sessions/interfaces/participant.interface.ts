import { ParticipantRole } from '../models/participant-role.enum';

export interface Participant {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: ParticipantRole;
  createdAt?: Date;
  updatedAt?: Date;
}
