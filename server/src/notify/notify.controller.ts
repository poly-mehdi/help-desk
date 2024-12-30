import { Controller, Get } from '@nestjs/common';
import { SlackService } from './providers/slack.service';

@Controller('slack')
export class NotifyController {
  constructor(private readonly slackService: SlackService) {}

  // @Get('test')
  // testSlack() {
  //   return this.slackService.postToSlack(
  //     "Hello from NestJS, I'm a bot message!",
  //   );
  // }
}
