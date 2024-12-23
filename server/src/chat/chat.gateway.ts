import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log('Client connected ! ', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected ! ');
  }
  @SubscribeMessage('message')
  handleNewMessage(client: Socket, message: any) {
    console.log(message);

    client.emit('reply', 'Hey client, I got your message !');

    this.server.emit('reply', message);
  }
}
