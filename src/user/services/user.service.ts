import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto } from '../dto/user.register.dto';
import { hash } from 'bcrypt';
import { IUserService } from '../interfaces/user.service.interface';

/**
 * @author Serdar Durdyev
 */
@Injectable()
export class UserService implements IUserService {

  private readonly salt: number = 10;

  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {
  }

  public async createUser(userRegisterDto: UserRegisterDto): Promise<User> {
    const userExist = await this.userRepo.findOne({ email: userRegisterDto.email });

    if (userExist)
      throw new ConflictException('Такой пользователь уже существует');

    return await this.initUserData(userRegisterDto);
  }

  private async initUserData(userRegisterDto: UserRegisterDto): Promise<User> {
    const newUser = new User();
    newUser.email = userRegisterDto.email;
    newUser.password = await hash(userRegisterDto.password, this.salt);
    await this.userRepo.save(newUser);

    return newUser;
  }
}