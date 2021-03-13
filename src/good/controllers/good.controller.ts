import { GoodService } from '../services/good.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { Good } from '../entity/good.entity';


@Controller('goods')
export class GoodController {
  constructor(public readonly goodService: GoodService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  public async getGood(@Param('id')id: number): Promise<Good> {
    return await this.goodService.getGoodById(id);
  }
}