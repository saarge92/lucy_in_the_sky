import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GoodUpdateDto {
  @Length(2, 255)
  @ApiProperty({
    title: 'Name of good', description: 'Good\'s description',
    minLength: 2, maximum: 255,
    type: 'string',
  })
  name: string;
}