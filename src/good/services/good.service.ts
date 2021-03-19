import { CACHE_MANAGER, CacheStore, ConflictException, Inject, Injectable } from '@nestjs/common';
import { Good } from '../entity/good.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CrudRequest } from '@nestjsx/crud';

@Injectable()
export class GoodService extends TypeOrmCrudService<Good> {
  constructor(@InjectRepository(Good) private readonly goodRepository: Repository<Good>,
              @Inject(CACHE_MANAGER) private readonly cacheManager: CacheStore) {
    super(goodRepository);
  }

  async getOne(req: CrudRequest): Promise<Good> {
    const searchIdElement = req.parsed.search.$and.find(element =>
      element != undefined && Object.keys(element).findIndex(key => key === 'id') != -1);
    const id = searchIdElement['id']['$eq'];

    const goodStorageId = `good-${id}`;
    const goodStorage = await this.cacheManager.get<string>(goodStorageId);
    if (goodStorage) {
      return JSON.parse(goodStorage) as Good;
    }
    const goodExist = await this.goodRepository.findOne(id);
    if (goodExist) {
      await this.cacheManager.set(goodStorageId, JSON.stringify(goodExist), { ttl: 60 });
      return goodExist;
    }
    return null;
  }
}