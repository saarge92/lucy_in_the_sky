import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthProvider } from './providers/auth.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthWebsocketService } from './services/auth-websocket.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserRegistered } from './jobs/subscribers/user-registered';
import { BullModule } from '@nestjs/bull';
import { USER_REGISTERED } from './constants/email.auth';
import { Role } from '../user/entity/role.entity';
import { AdminWebsocketService } from './services/admin-websocket.service';
import { UserRegisteredGateway } from './gateways/user-registered-gateway';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User, Role]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<number>('JWT_EXPIRE'),
          issuer: configService.get<string>('JWT_ISSUER'),
        },
      }),
    }),
    MailerModule,
    BullModule.registerQueue({
      name: USER_REGISTERED,
    }),
  ],
  providers: [...AuthProvider, JwtStrategy, ConfigService, JwtAuthGuard, AuthWebsocketService,
    UserRegistered, UserRegisteredGateway, AdminWebsocketService],
  exports: [...AuthProvider, JwtModule, AuthWebsocketService, AdminWebsocketService],
})
export class AuthModule {
}
