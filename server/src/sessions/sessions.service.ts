import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ParticipantRole } from './models/participant-role.enum';
import { Session } from './interfaces/session.interface';

@Injectable()
export class SessionsService {
  async addParticipant(
    id: string,
    data: {
      firstName: string;
      lastName: string;
      email: string;
      role: ParticipantRole;
    },
  ) {
    const session = await this.sessionModel.findById(id).exec();
    if (!session) {
      throw new Error('Session not found');
    }
    session.participants.push(data);
    await session.save();
  }
  constructor(
    @InjectModel('Session')
    private sessionModel: Model<Session>,
  ) {}
  // changer le dto pour avoir le network
  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const createdCat = this.sessionModel.create(createSessionDto);
    return createdCat;
  }

  async findAll(): Promise<Session[]> {
    return this.sessionModel.find().exec();
  }

  async findOne(id: string): Promise<Session> {
    return this.sessionModel.findById(id).exec();
  }

  async update(
    id: string,
    updateSessionDto: UpdateSessionDto,
  ): Promise<Session> {
    return this.sessionModel
      .findByIdAndUpdate(id, updateSessionDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Session> {
    return this.sessionModel.findByIdAndDelete(id).exec();
  }
}
