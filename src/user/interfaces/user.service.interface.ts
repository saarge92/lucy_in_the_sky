import { UserRegisterDto } from '../dto/user.register.dto';
import { User } from '../entity/user.entity';
import { QueryRunner } from 'typeorm';

export interface IUserService {
  createUser(userRegisterDto: UserRegisterDto, queryRunner: QueryRunner | null): Promise<User>;

  checkUserByEmail(email: string): Promise<User>;
}