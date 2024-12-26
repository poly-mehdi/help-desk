import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongo:27017/HELPDESK')],
  providers: [...databaseProviders],
  exports: [...databaseProviders, MongooseModule],
})
export class DatabaseModule {}
