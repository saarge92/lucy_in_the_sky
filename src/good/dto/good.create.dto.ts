import { Length } from 'class-validator';

export class GoodCreateDto {
  @Length(2, 255)
  name: string;
}