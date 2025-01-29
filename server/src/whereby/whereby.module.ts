import { Module } from '@nestjs/common';
import { WherebyService } from './whereby.service';

@Module({})
export class WherebyModule {
  providers: [WherebyService];
  exports: [WherebyService];
}
