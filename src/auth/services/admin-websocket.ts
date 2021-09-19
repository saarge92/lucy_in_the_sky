import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';
import { USER_SERVICE } from '../../user/constants/providers.constants';
import { IUserService } from '../../user/interfaces/user.service.interface';
import { Role } from '../../user/entity/role.entity';

@Injectable()
export class AdminWebsocket {
  private readonly logger = new Logger(AdminWebsocket.name);
  private readonly availableRoles = new Array('Admin');

  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService,
              @Inject(USER_SERVICE) private readonly userService: IUserService) {
  }

  public async checkPermissions(socket: Socket): Promise<void> {
    try {
      const token = socket.handshake.query.token;
      if (!token) {
        throw new WsException('Токен отсутсвует');
      }
      const secret = this.configService.get<string>('JWT_SECRET');
      const payload = await this.jwtService.verifyAsync(token, { secret });
      if (!payload.user) {
        throw new WsException('Токен отсутсвует');
      }
      const user = await this.userService.checkUserByEmail(payload.user);
      if (!user) {
        this.logger.error('Попытка неавторизованного доступа');
        throw new WsException('Токен отсутсвует');
      }
      const userRoles = await user.roles;
      const userHasRole = userRoles.findIndex((role: Role) => this.availableRoles.includes(role.name));
      if (userHasRole <= -1) {
        throw new WsException('Токен отсутсвует');
      }
    } catch (error) {
      socket.disconnect();
    }
  }
}