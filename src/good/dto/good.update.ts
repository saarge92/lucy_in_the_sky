import { Length } from 'class-validator';

export class GoodUpdateDto {
  @Length(2, 255)
  name: string;
}