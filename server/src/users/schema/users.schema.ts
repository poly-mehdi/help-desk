import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserStatus } from './user-status.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop({ default: Date.now })
  date?: Date;

  @Prop()
  appName?: string;

  @Prop({
    type: String,
    enum: UserStatus,
    default: UserStatus.Pending,
  })
  status?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.pre('save', function (next) {
//   if (!this.username || !this.name || !this.email) {
//     return next(
//       new Error('Validation failed: username, name, and email are required.'),
//     );
//   }
//   next();
// });

// export { UserSchema };
