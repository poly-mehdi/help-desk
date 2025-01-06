import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from './schema/sessions.schema';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel('Session')
    private sessionModel: Model<Session>,
  ) {}

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
