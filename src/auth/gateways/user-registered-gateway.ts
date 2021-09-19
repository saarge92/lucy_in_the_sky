import {
  BaseWsExceptionFilter,
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AdminWebsocket } from '../services/admin-websocket';
import { Socket } from 'socket.io';
import { UseFilters } from '@nestjs/common';

@WebSocketGateway(Number(process.env.WEBSOCKET_PORT), { namespace: '/admin' })
export class UserRegisteredGateway implements OnGatewayConnection {
  @WebSocketServer() private readonly webSocketServer;

  constructor(private readonly adminGatewayService: AdminWebsocket) {
  }

  @UseFilters(new BaseWsExceptionFilter())
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async handleConnection(client: Socket, ...args: any[]): Promise<any> {
    await this.adminGatewayService.checkPermissions(client);
  }

  public async userHasRegistered(userInfo: [string, string]): Promise<void> {
    await this.webSocketServer.emit('user-has-registered', userInfo);
  }

}