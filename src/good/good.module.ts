import { Module } from '@nestjs/common';
import { MemcachedModule } from '@nestcloud/memcached';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Good } from './entity/good.entity';
import { GoodController } from './controllers/good.controller';

@Module({
  imports: [
    MemcachedModule.register({
      uri: [process.env.MEMCAHED_URI],
      retries: 4,
    }),
    TypeOrmModule.forFeature([Good]),
  ],
  controllers: [GoodController],
  exports: [MemcachedModule]
})
export class GoodModule {
}
