import { CACHE_MANAGER, CacheStore, ConflictException, Inject, Injectable } from '@nestjs/common';
import { Good } from '../entity/good.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoodCreateDto } from '../dto/good.create.dto';
import { GoodUpdateDto } from '../dto/good.update';

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
    const goodExist = await this.goodRepository.findOne(id);
    if (goodExist) {
      await this.cacheManager.set(goodStorageId, JSON.stringify(goodExist), { ttl: 60 });
      return goodExist;
    }
    return null;
  }

  public async create(good: GoodCreateDto): Promise<Good> {
    return await this.initAndCreateGood(good);
  }

  public async update(id: number, good: GoodUpdateDto): Promise<Good> {
    const existGood = await this.goodRepository.findOne(id);
    if (!existGood)
      throw new ConflictException('Такого товара нет');

    existGood.name = good.name;
    await this.goodRepository.save(existGood);
    return existGood;
  }

  public async getGoods(page = 1, perPage = 10): Promise<Array<Good>> {
    if (perPage > 30)
      perPage = 30;
    return await this.goodRepository.find({ take: perPage, skip: (page - 1) * perPage });
  }

  private async initAndCreateGood(goodDto: GoodCreateDto): Promise<Good> {
    const newGood = new Good();
    newGood.name = goodDto.name;
    await this.goodRepository.save(newGood);
    return newGood;
  }
}