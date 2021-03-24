import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { UserRegisterDto } from '../dto/user.register.dto';
import { hash } from 'bcrypt';
import { IUserService } from '../interfaces/user.service.interface';

/**
 * @author Serdar Durdyev
 */
@Injectable()
export class UserService implements IUserService {

  private readonly salt: number = 10;

  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>,
              private readonly connection: Connection) {
  }

  public async createUser(userRegisterDto: UserRegisterDto, queryRunner: QueryRunner = null): Promise<User> {
    const userExist = await this.userRepo.findOne({ email: userRegisterDto.email });

    if (userExist)
      throw new ConflictException('Такой пользователь уже существует');

    return await this.initUserData(userRegisterDto, queryRunner);
  }

  private async initUserData(userRegisterDto: UserRegisterDto, queryRunner: QueryRunner = null): Promise<User> {
    if (!queryRunner)
      queryRunner = this.connection.createQueryRunner();
    const newUser = new User();
    newUser.email = userRegisterDto.email;
    newUser.password = await hash(userRegisterDto.password, this.salt);
    await queryRunner.manager.save(newUser);

    return newUser;
  }

  public async checkUserByEmail(email: string): Promise<User> {
    return await this.userRepo.findOne({ where: { email } });
  }
}