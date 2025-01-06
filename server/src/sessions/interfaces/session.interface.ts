import { Document } from 'mongoose';

export interface Session extends Document {
  id: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  appName: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
