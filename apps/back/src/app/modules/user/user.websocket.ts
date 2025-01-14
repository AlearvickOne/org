import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';

@WebSocketGateway(4300, { namespace: 'ws' })
export class UserWebSocket {
  constructor() {}

  @SubscribeMessage('comment')
  async emitComment(@MessageBody() data: string) {
    return data;
  }
}
