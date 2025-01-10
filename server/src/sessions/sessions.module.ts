import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema, Session } from './schemas/session.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
  ],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
