import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { AdminWebsocketService } from '../services/admin-websocket.service';
import { Socket } from 'socket.io';

@WebSocketGateway(Number(process.env.WEBSOCKET_PORT), { namespace: '/admin' })
export class UserRegisteredGateway implements OnGatewayConnection {
  @WebSocketServer() private readonly webSocketServer;

  constructor(private readonly adminGatewayService: AdminWebsocketService) {
  }

  public async handleConnection(client: Socket, ...args: any[]): Promise<any> {
    await this.adminGatewayService.checkPermissions(client);
  }

  public async userHasRegistered(userInfo: [string, string]): Promise<void> {
    await this.webSocketServer.emit('user-has-registered', userInfo);
  }

}