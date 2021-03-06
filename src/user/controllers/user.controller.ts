import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { UserRegisterDto } from '../dto/user.register.dto';
import { UserCreatedResponse } from '../responses/user_created.response';
import { AUTH_SERVICE } from '../constants/providers.constants';
import { IAuthService } from '../../auth/contracts/auth.service.interface';
import { UserLoginDto } from '../dto/user.login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('user')
export class UserController {

  constructor(@Inject(AUTH_SERVICE) private readonly authService: IAuthService) {
  }

  @Post('/register')
  public async registerUser(@Body() registerDto: UserRegisterDto): Promise<UserCreatedResponse> {
    return await this.authService.registerUser(registerDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public async loginUser(@Body()userLoginDto: UserLoginDto): Promise<any> {
    return await this.authService.loginUser(userLoginDto);
  }
}
