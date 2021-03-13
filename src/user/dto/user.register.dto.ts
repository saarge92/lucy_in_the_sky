import { IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
  @IsEmail()
  @ApiProperty({
    title: 'Email', description: 'User\'s email',
    minLength: 2, maximum: 255,
    type: 'string',
    example: "example@mail.ru"
  })
  email: string;

  @Length(6, 120)
  @ApiProperty({
    title: 'Password', description: 'User\'s email',
    minLength: 2, maximum: 255,
    type: 'string',
    example: '123456'
  })
  password: string;
}