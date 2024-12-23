import { Module } from '@nestjs/common';
import { WebsocketGateway } from './chat.gateway';

@Module({
  providers: [WebsocketGateway],
})
export class ChatModule {}
