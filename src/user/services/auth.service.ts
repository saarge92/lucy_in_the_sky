import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { USER_SERVICE } from '../constants/providers.constants';
import { IUserService } from '../interfaces/user.service.interface';
import { UserRegisterDto } from '../dto/user.register.dto';
import { UserCreatedResponse } from '../responses/user_created.response';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from '../interfaces/auth.service.interface';
import { UserLoginDto } from '../dto/user.login.dto';
import { UserAuthenticated } from '../responses/user_authenticated.response';
import { compare } from 'bcrypt';

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

  public async loginUser(userLoginDto: UserLoginDto): Promise<UserAuthenticated> {
    const existedUser = await this.userService.checkUserByEmail(userLoginDto.email);
    if (!existedUser)
      throw new ConflictException('Неверный логин или пароль');

    const isMatch = await compare(userLoginDto.password, existedUser.password);
    if (!isMatch)
      throw new ConflictException('Неверный логин или пароль');

    const token = await this.jwtService.signAsync({ user: existedUser.email });
    return {
      token,
      user: existedUser.email,
    };
  }
}