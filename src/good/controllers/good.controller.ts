import { GoodService } from '../services/good.service';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { Good } from '../entity/good.entity';
import { GoodCreateDto } from '../dto/good.create.dto';
import { GoodUpdateDto } from '../dto/good.update';


@Controller('goods')
export class GoodController {
  constructor(public readonly goodService: GoodService) {
  }

  @Get('/:id')
  public async getGood(@Param('id')id: number): Promise<Good> {
    return await this.goodService.getGoodById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async createGood(@Body()goodDto: GoodCreateDto): Promise<Good> {
    return await this.goodService.create(goodDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  public async updateDto(@Param('id')id: number, @Body()goodUpdate: GoodUpdateDto): Promise<Good> {
    return await this.goodService.update(id, goodUpdate);
  }

  @Get('/')
  public async getGoods(@Query('page')page = 1, @Query('perPage')perPage = 10): Promise<Array<Good>> {
    return await this.goodService.getGoods(page, perPage);
  }
}