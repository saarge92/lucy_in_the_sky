import { Inject, Injectable } from '@nestjs/common';
import { USER_SERVICE } from '../constants/providers.constants';
import { IUserService } from '../interfaces/user.service.interface';
import { UserRegisterDto } from '../dto/user.register.dto';
import { UserCreatedResponse } from '../responses/user_created.response';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from '../interfaces/auth.service.interface';

/**
 * @author Serdar Durdyev
 */
@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject(USER_SERVICE) private readonly userService: IUserService,
              private readonly jwtService: JwtService) {
  }

  public async registerUser(userRegisterDto: UserRegisterDto): Promise<UserCreatedResponse> {
    const createdUser = await this.userService.createUser(userRegisterDto);
    const token = await this.jwtService.sign({ user: createdUser.email });

    return {
      token,
      user: createdUser.email,
    };
  }
}