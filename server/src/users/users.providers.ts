import { Mongoose } from 'mongoose';
import { UserSchema } from './schema/users.schema';
import { DATABASE_CONNECTION, USER_MODEL } from '../utils/constants';

export const usersProviders = [
  {
    provide: USER_MODEL,
    useFactory: (mongoose: Mongoose) => mongoose.model('User', UserSchema),
    inject: [DATABASE_CONNECTION],
  },
];
