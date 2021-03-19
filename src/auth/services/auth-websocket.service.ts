import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { WsException } from '@nestjs/websockets';
import { IUserService } from '../../user/interfaces/user.service.interface';
import { USER_SERVICE } from '../../user/constants/providers.constants';

@Injectable()
export class AuthWebsocketService {
  private readonly logger = new Logger(AuthWebsocketService.name);

  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService,
              @Inject(USER_SERVICE) private readonly userService: IUserService) {
  }

  public async checkTokenFromSocket(socket: Socket): Promise<void> {
    try {
      const token = socket.handshake.query.token;
      if (!token) {
        socket.disconnect();
        return;
      }
      const secret = this.configService.get<string>('JWT_SECRET');
      const payload = await this.jwtService.verifyAsync(token, { secret });
      if (!payload.user) {
        socket.disconnect();
        return;
      }
      const user = await this.userService.checkUserByEmail(payload.user);
      if (!user) {
        this.logger.error('Попытка неавторизованного подключения к каналу');
        throw new Error('Такой пользователь отсутсвует в базе');
      }
    } catch (error) {
      throw new WsException(error);
    }
  }
}