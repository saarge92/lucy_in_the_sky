import { UserRegisterDto } from '../dto/user.register.dto';
import { UserCreatedResponse } from '../responses/user_created.response';
import { UserLoginDto } from '../dto/user.login.dto';
import { UserAuthenticated } from '../responses/user_authenticated.response';

export interface IAuthService {
  registerUser(userRegisterDto: UserRegisterDto): Promise<UserCreatedResponse>;

  loginUser(userLoginDto: UserLoginDto): Promise<UserAuthenticated>
}