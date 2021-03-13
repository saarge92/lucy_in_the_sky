import { Good } from '../entity/good.entity';
import { GoodCreateDto } from '../dto/good.create.dto';
import { GoodUpdateDto } from '../dto/good.update';

export interface IGoodService {
  getGoodById(id: number): Promise<Good>;

  create(good: GoodCreateDto): Promise<Good>;

  update(id: number, good: GoodUpdateDto): Promise<Good>;

  getGoods(page: number, perPage: number): Promise<Array<Good>>
}