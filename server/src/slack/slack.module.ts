import { Module } from '@nestjs/common';
import { SlackService } from './slack.service';
import { SlackController } from './slack.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [SlackService],
  controllers: [SlackController],
  exports: [SlackService], // Exporter SlackService pour qu'il soit disponible dans d'autres modules
})
export class SlackModule {}
