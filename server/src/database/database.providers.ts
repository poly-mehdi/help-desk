import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from '../utils/constants';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://mongo:27017/HELPDESK'),
  },
];
