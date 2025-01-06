import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SessionStatus } from './session-status.enum';

export type SessionDocument = HydratedDocument<Session>;

@Schema({ timestamps: true })
export class Session {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop()
  appName?: string;

  @Prop({
    type: String,
    enum: SessionStatus,
    default: SessionStatus.Pending,
  })
  status?: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);

// UserSchema.pre('save', function (next) {
//   if (!this.username || !this.name || !this.email) {
//     return next(
//       new Error('Validation failed: username, name, and email are required.'),
//     );
//   }
//   next();
// });

// export { UserSchema };
