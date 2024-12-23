import { Document } from 'mongoose';

export interface User extends Document {
  id: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  date: Date;
  appName: string;
  status: string;
}
