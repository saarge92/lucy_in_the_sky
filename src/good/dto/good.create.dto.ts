import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GoodCreateDto {
  @ApiProperty({
    title: 'Name of good', description: 'Good\'s description',
    minLength: 2, maximum: 255,
    type: 'string',
  })
  @Length(2, 255)
  name: string;
}