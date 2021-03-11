import { IsEmail, Length } from 'class-validator';

export class UserRegisterDto {
  @IsEmail()
  email: string;

  @Length(6, 120)
  password: string;
}