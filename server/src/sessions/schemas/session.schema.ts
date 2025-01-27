import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SessionStatus } from '../models/session-status.enum';
import { Session as ISession } from '../interfaces/session.interface';
import { Participant } from '../interfaces/participant.interface';
import { ParticipantSchema } from './participant.schema';

export type SessionDocument = HydratedDocument<Session>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Session implements ISession {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  @Prop({
    type: [ParticipantSchema],
    default: [],
  })
  participants?: Participant[];

  @Prop()
  appName?: string;

  @Prop({
    type: String,
    enum: SessionStatus,
    default: SessionStatus.Pending,
    required: true,
  })
  status: SessionStatus;

  @Prop()
  meetingId?: string;

  @Prop()
  roomUrl?: string;

  @Prop()
  hostRoomUrl?: string;

  @Prop({ required: true, default: false })
  isResolved: boolean;

  @Prop()
  issueType?: string;

  @Prop()
  language?: string;
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
