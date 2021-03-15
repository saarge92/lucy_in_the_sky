import {
  Controller,
  Inject, UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GOOD_SERVICE } from '../constans/good.constant';
import { Crud } from '@nestjsx/crud';
import { Good } from '../entity/good.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { GoodService } from '../services/good.service';

@ApiTags('goods')
@Crud({
  model: {
    type: Good,
  },
  routes: {
    createOneBase: {
      decorators: [UseGuards(JwtAuthGuard)],
    },
    updateOneBase: {
      decorators: [UseGuards(JwtAuthGuard)],
    },
  },
})
@Controller('goods')
export class GoodController {
  constructor(@Inject(GOOD_SERVICE) public readonly service: GoodService) {
  }
}