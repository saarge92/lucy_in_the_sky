import { UserRegisterDto } from '../dto/user.register.dto';
import { UserCreatedResponse } from '../responses/user_created.response';

export interface IAuthService {
  registerUser(userRegisterDto: UserRegisterDto): Promise<UserCreatedResponse>;
}