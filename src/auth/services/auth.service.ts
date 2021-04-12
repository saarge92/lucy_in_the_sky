import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { USER_SERVICE } from '../../user/constants/providers.constants';
import { IUserService } from '../../user/interfaces/user.service.interface';
import { UserRegisterDto } from '../../user/dto/user.register.dto';
import { UserCreatedResponse } from '../../user/responses/user_created.response';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from '../interfaces/auth.service.interface';
import { UserLoginDto } from '../../user/dto/user.login.dto';
import { UserAuthenticated } from '../../user/responses/user_authenticated.response';
import { compare } from 'bcrypt';
import { InjectQueue } from '@nestjs/bull';
import { USER_REGISTERED } from '../constants/email.auth';
import { Queue } from 'bull';
import { Connection } from 'typeorm';
import { Role } from '../../user/entity/role.entity';
import { UserInRoleEntity } from '../../user/entity/user-in-role.entity';

/**
 * @author Serdar Durdyev
 */
@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject(USER_SERVICE) private readonly userService: IUserService,
              private readonly jwtService: JwtService,
              private readonly connection: Connection,
              @InjectQueue(USER_REGISTERED) private readonly userRegisterQueue: Queue) {
  }

  public async registerUser(userRegisterDto: UserRegisterDto): Promise<UserCreatedResponse> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const createdUser = await this.userService.createUser(userRegisterDto, queryRunner);
      const userRole = await queryRunner.manager.findOne(Role, { where: { name: 'User' } });
      await queryRunner.manager.save(UserInRoleEntity, { userId: createdUser.id, roleId: userRole.id });
      await queryRunner.commitTransaction();

      const token = await this.jwtService.signAsync({ user: createdUser.email });

      await this.userRegisterQueue.add({
        email: createdUser.email,
      });

      return {
        token,
        user: createdUser.email,
      };

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException(error.message);
    } finally {
      await queryRunner.manager.release();
    }
  }

  public async loginUser(userLoginDto: UserLoginDto): Promise<UserAuthenticated> {

    const existedUser = await this.userService.checkUserByEmail(userLoginDto.email);
    if (!existedUser)
      throw new ConflictException('Неверный логин или пароль');

    const isMatch = await compare(userLoginDto.password, existedUser.password);
    if (!isMatch)
      throw new ConflictException('Неверный логин или пароль');

    const roles = (await existedUser.roles).map(role => role.name);

    const token = await this.jwtService.signAsync({ user: existedUser.email });
    return {
      token,
      user: existedUser.email,
      roles,
    };
  }
}