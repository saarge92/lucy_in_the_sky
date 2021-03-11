import { IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  email: Readonly<string>;

  @IsNotEmpty()
  password: Readonly<string>;
}