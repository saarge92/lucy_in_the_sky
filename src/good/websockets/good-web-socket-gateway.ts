import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Good } from '../entity/good.entity';
import { AuthWebsocketService } from '../../auth/services/auth-websocket.service';

@WebSocketGateway(Number(process.env.WEBSOCKET_PORT), { namespace: '/goods' })
export class GoodWebSocketGateway implements OnGatewayConnection {
  constructor(private readonly authWebsocket: AuthWebsocketService) {
  }

  @WebSocketServer() private readonly webSocketServer: Server;

  public async handleConnection(client: Socket, ...args: any[]): Promise<any> {
    await this.authWebsocket.checkTokenFromSocket(client);
  }

  public async goodCreated(good: Good): Promise<void> {
    await this.webSocketServer.emit('good-created', good);
  }
}