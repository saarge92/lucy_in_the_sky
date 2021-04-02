import {
  Controller,
  Inject, UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { Good } from '../entity/good.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { GoodService } from '../services/good.service';
import { GoodWebSocketGateway } from '../websockets/good-web-socket-gateway';
import { GoodCreateDto } from '../dto/good.create.dto';
import { GoodUpdateDto } from '../dto/good.update';

@ApiTags('goods')
@Crud({
  model: {
    type: Good,
  },
  dto: {
    update: GoodUpdateDto,
  },
})
@Controller('goods')
export class GoodController implements CrudController<Good> {
  constructor(public readonly service: GoodService,
              private readonly goodWebSocketGateWay: GoodWebSocketGateway) {
  }

  @Override('createOneBase')
  @UseGuards(JwtAuthGuard)
  public async createOne(@ParsedRequest()req: CrudRequest, @ParsedBody() dto: GoodCreateDto): Promise<Good> {
    const createdGood = await this.service.createOne(req, dto);
    await this.goodWebSocketGateWay.goodCreated(createdGood);
    return createdGood;
  }
}