import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Participant as IParticipant } from '../interfaces/participant.interface';
import { ParticipantRole } from '../models/participant-role.enum';
import { HydratedDocument } from 'mongoose';

export type ParticipantDocument = HydratedDocument<Participant>;

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
export class Participant implements IParticipant {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  phone?: string;

  @Prop()
  role: ParticipantRole;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
