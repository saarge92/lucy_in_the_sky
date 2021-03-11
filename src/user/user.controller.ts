import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserRegisterDto } from './dto/user.register.dto';
import { UserCreatedResponse } from './responses/user_created.response';
import { AUTH_SERVICE } from './constants/providers.constants';
import { IAuthService } from './interfaces/auth.service.interface';

@Controller('user')
export class UserController {

  constructor(@Inject(AUTH_SERVICE) private readonly authService: IAuthService) {
  }

  @Post('/register')
  public async registerUser(@Body()registerDto: UserRegisterDto): Promise<UserCreatedResponse> {
    return await this.authService.registerUser(registerDto);
  }
}
