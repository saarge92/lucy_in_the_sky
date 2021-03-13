import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Good } from './entity/good.entity';
import { GoodController } from './controllers/good.controller';
import { GoodService } from './services/good.service';
import { GoodProvider } from './providers/good.provider';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([Good]),
  ],
  controllers: [GoodController],
  providers: [...GoodProvider],
  exports: [],
})
export class GoodModule {
}