import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IUserService } from '../../user/interfaces/user.service.interface';
import { USER_SERVICE } from '../../user/constants/providers.constants';
import { User } from '../../user/entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService,
              @Inject(USER_SERVICE) private readonly userService: IUserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.userService.checkUserByEmail(payload.user);
    if (!user)
      throw new UnauthorizedException('Пользователь не найден');
    return user;
  }

}