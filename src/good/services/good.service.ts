import { CACHE_MANAGER, CacheStore, Inject, Injectable } from '@nestjs/common';
import { Good } from '../entity/good.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GoodService {
  constructor(@InjectRepository(Good) private readonly goodRepository: Repository<Good>,
              @Inject(CACHE_MANAGER) private readonly cacheManager: CacheStore) {
  }

  public async getGoodById(id: number): Promise<Good> {
    const goodStorageId = `good-${id}`;
    const goodStorage = await this.cacheManager.get<string>(goodStorageId);
    if (goodStorage) {
      return JSON.parse(goodStorage) as Good;
    }
  }
}