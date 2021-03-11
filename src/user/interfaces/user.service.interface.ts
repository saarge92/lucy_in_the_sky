import { UserRegisterDto } from '../dto/user.register.dto';
import { User } from '../entity/user.entity';

export interface IUserService {
  createUser(userRegisterDto: UserRegisterDto): Promise<User>;

  checkUserByEmail(email: string): Promise<User>;
}