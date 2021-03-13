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

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
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
  ],
  providers: [...AuthProvider, JwtStrategy, ConfigService, JwtAuthGuard],
  exports: [...AuthProvider, JwtModule],
})
export class AuthModule {
}
