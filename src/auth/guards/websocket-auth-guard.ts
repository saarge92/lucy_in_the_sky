import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WebsocketAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client: Socket = context.switchToWs().getClient();
      const token = client.handshake.query.toString();
      if (!token) {
        throw new WsException('Укажите токен безопасности');
      }
      const jwtPayLoad = await this.jwtService.verifyAsync(token);
      // todo
      console.log(jwtPayLoad);
    } catch (ex) {
      throw new WsException(ex);
    }

    return true;
  }
}