import { CACHE_MANAGER, CacheStore, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Good } from '../entity/good.entity';
import { CrudRequest } from '@nestjsx/crud';

@Injectable()
export class GoodService extends TypeOrmCrudService<Good> {
  constructor(@InjectRepository(Good) private readonly goodRepo: Repository<Good>,
              @Inject(CACHE_MANAGER) private cacheManager: CacheStore) {
    super(goodRepo);
  }

  public async getOne(req: CrudRequest): Promise<Good> {
    const goodId = req.parsed.search.$and[1]['id']['$eq'];
    const cacheGood: any = await this.cacheManager.get(`good-${goodId}`);
    if (!cacheGood) {
      const good = await this.goodRepo.findOne(goodId);
      if (good) {
        await this.cacheManager.set(`good-${goodId}`, JSON.stringify(good), { ttl: 60 });
        return good;
      }
      return null;
    }
    return JSON.parse(cacheGood) as Good;
  }

}