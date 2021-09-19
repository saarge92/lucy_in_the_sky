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
import { Role } from '../user/entity/role.entity';
import { AdminWebsocket } from './services/admin-websocket';
import { UserRegisteredGateway } from './gateways/user-registered-gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserRegisteredRouting } from './jobs/constants/routing-keys';
import { UserRegisteredQueue } from './jobs/constants/queues';

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
    ClientsModule.registerAsync([
      {
        name: UserRegisteredRouting,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URI')],
            queue: UserRegisteredQueue,
            queueOptions: {
              durable: false,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UserRegistered],
  providers: [...AuthProvider, JwtStrategy, ConfigService, JwtAuthGuard, AuthWebsocketService,
    UserRegistered, UserRegisteredGateway, AdminWebsocket],
  exports: [...AuthProvider, JwtModule, AuthWebsocketService, AdminWebsocket],
})
export class AuthModule {
}
