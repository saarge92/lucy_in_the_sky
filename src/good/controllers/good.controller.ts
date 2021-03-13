import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { Good } from '../entity/good.entity';
import { GoodCreateDto } from '../dto/good.create.dto';
import { GoodUpdateDto } from '../dto/good.update';
import { ApiQuery, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { IGoodService } from '../interfaces/good.service.interface';
import { GOOD_SERVICE } from '../constans/good.constant';

@ApiTags('goods')
@Controller('goods')
export class GoodController {
  constructor(@Inject(GOOD_SERVICE) public readonly goodService: IGoodService) {
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'The good element returned successfully' })
  public async getGood(@Param('id')id: number): Promise<Good> {
    return await this.goodService.getGoodById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 200, description: 'Return created good' })
  @ApiSecurity('bearer')
  public async createGood(@Body()goodDto: GoodCreateDto): Promise<Good> {
    return await this.goodService.create(goodDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  public async updateDto(@Param('id')id: number, @Body()goodUpdate: GoodUpdateDto): Promise<Good> {
    return await this.goodService.update(id, goodUpdate);
  }

  @ApiQuery({
    name: 'page', description: 'Current page',
    type: 'number', example: 1, allowEmptyValue: false,
  })
  @ApiQuery({
    name: 'perPage', description: 'Current pages for 1 response',
    type: 'number',
    example: 10,
    allowEmptyValue: false,
  })
  @Get('/')
  public async getGoods(@Query('page')page = 1, @Query('perPage')perPage = 10): Promise<Array<Good>> {
    return await this.goodService.getGoods(page, perPage);
  }
}