import { UserRegisterDto } from '../../user/dto/user.register.dto';
import { UserCreatedResponse } from '../../user/responses/user_created.response';
import { UserLoginDto } from '../../user/dto/user.login.dto';
import { UserAuthenticated } from '../../user/responses/user_authenticated.response';

export interface IAuthService {
  registerUser(userRegisterDto: UserRegisterDto): Promise<UserCreatedResponse>;

  loginUser(userLoginDto: UserLoginDto): Promise<UserAuthenticated>
}