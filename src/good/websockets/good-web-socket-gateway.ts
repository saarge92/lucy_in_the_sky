import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Good } from '../entity/good.entity';
import { UseGuards } from '@nestjs/common';
import { WebsocketAuthGuard } from '../../auth/guards/websocket-auth-guard';
import { AuthWebsocketService } from '../../auth/services/auth-websocket.service';

@UseGuards(WebsocketAuthGuard)
@WebSocketGateway(8001, { namespace: '/goods' })
export class GoodWebSocketGateway implements OnGatewayConnection {
  constructor(private readonly authWebsocket: AuthWebsocketService) {
  }

  @WebSocketServer() private readonly webSocketServer: Server;

  public async handleConnection(client: Socket, ...args: any[]): Promise<any> {
    await this.authWebsocket.checkTokenFromSocket(client);
  }

  public async goodCreated(good: Good) {
    this.webSocketServer.emit('good-created', good);
  }
}