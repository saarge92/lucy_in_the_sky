import { Crud } from '@nestjsx/crud';
import { Good } from '../entity/good.entity';
import { GoodService } from '../services/good.service';
import { Controller } from '@nestjs/common';

@Crud({
  model: {
    type: Good,
  },
})
@Controller('goods')
export class GoodController {
  constructor(public readonly goodService: GoodService) {
  }
}