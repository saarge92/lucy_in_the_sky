import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Good } from '../entity/good.entity';
import { CrudRequest } from '@nestjsx/crud';
import { InjectMemcachedClient, Memcached } from '@nestcloud/memcached';

@Injectable()
export class GoodService extends TypeOrmCrudService<Good> {
  constructor(@InjectRepository(Good) private readonly goodRepo: Repository<Good>,
              @InjectMemcachedClient() private readonly memcachedClient: Memcached) {
    super(goodRepo);
  }

  public getOne(req: CrudRequest): Promise<Good> {
    return null;
  }
}