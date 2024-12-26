import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { SlackService } from '../slack/slack.service';

@WebSocketGateway({ cors: true })
export class ClientGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly slackService: SlackService) {}

  handleConnection(client: Socket, ...args: any[]) {
    console.log('Client connected! ', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected! ');
  }
  @SubscribeMessage('message')
  handleNewMessage(client: Socket, message: any) {
    console.log(message);

    client.emit('reply', 'Hey client, I got your message!');

    this.server.emit('reply', message);
  }

  @SubscribeMessage('helpRequest')
  handleHelpRequest(client: Socket, message: any) {
    console.log(message);

    client.emit('reply', 'Hey client, I got your message!');

    this.server.emit('reply', message);
  }

  @SubscribeMessage('clientJoinedQueue')
  async handleClientJoinedQueue(
    @MessageBody()
    data: {
      username: string;
      lastName: string;
      email: string;
      socketId: string;
    },
  ) {
    console.log(
      `Client joined queue: ${data.username} ${data.lastName}, Socket ID: ${data.socketId}`,
    );

    const message = `Client ${data.username} ${data.lastName} (${data.email}) has joined the queue.`;
    await this.slackService.postToSlack(message);
  }
}
