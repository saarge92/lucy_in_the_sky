import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Good } from './entity/good.entity';
import { GoodController } from './controllers/good.controller';
import { GoodService } from './services/good.service';
import { GoodProvider } from './providers/good.provider';
import { GoodWebSocketGateway } from './websockets/good-web-socket-gateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    CacheModule.register(),
    AuthModule,
    TypeOrmModule.forFeature([Good]),
  ],
  controllers: [GoodController],
  providers: [...GoodProvider, GoodService, GoodWebSocketGateway],
  exports: [],
})
export class GoodModule {
}