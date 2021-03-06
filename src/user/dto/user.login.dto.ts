import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @IsNotEmpty()
  @ApiProperty({
    title: 'Email of user', description: 'User\'s email',
    minLength: 2, maximum: 255,
    type: 'string',
    example: 'example@mail.ru'
  })
  email: Readonly<string>;

  @IsNotEmpty()
  @ApiProperty({
    title: 'Password of the user', description: 'User\'s password',
    minLength: 2, maximum: 255,
    type: 'string',
    example: "123456"
  })
  password: Readonly<string>;
}