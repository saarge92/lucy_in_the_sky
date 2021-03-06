import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { USER_SERVICE } from '../../user/constants/providers.constants';
import { IUserService } from '../../user/interfaces/user.service.interface';
import { UserRegisterDto } from '../../user/dto/user.register.dto';
import { UserCreatedResponse } from '../../user/responses/user_created.response';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from '../contracts/auth.service.interface';
import { UserLoginDto } from '../../user/dto/user.login.dto';
import { UserAuthenticated } from '../../user/responses/user_authenticated.response';
import { compare } from 'bcrypt';
import { Role } from '../../user/entity/role.entity';
import { UserInRoleEntity } from '../../user/entity/user-in-role.entity';
import { UserRegisteredGateway } from '../gateways/user-registered-gateway';
import { UserRegisteredJobDto } from '../dto/jobs/user-registered-job-dto';
import { Connection } from 'typeorm';
import { UserRegisteredRouting } from '../jobs/constants/routing-keys';
import { ClientProxy } from '@nestjs/microservices';
import { UserRegisteredQueue } from '../jobs/constants/queues';


/**
 * @author Serdar Durdyev
 */
@Injectable()
export class Auth implements IAuthService {
  private readonly logger: Logger = new Logger(Auth.name);

  constructor(@Inject(USER_SERVICE) private readonly userService: IUserService,
              private readonly jwtService: JwtService,
              private readonly connection: Connection,
              private readonly userRegisteredGateway: UserRegisteredGateway,
              @Inject(UserRegisteredRouting) private readonly client: ClientProxy) {
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

      await this.userRegisteredGateway.userHasRegistered(
        [
          createdUser.email, createdUser.id.toString(),
        ],
      );
      const userRegisteredDto: UserRegisteredJobDto = {
        email: createdUser.email,
      };
      await this.client.emit(UserRegisteredQueue, userRegisteredDto);
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
      throw new ConflictException('???????????????? ?????????? ?????? ????????????');

    const isMatch = await compare(userLoginDto.password, existedUser.password);
    if (!isMatch)
      throw new ConflictException('???????????????? ?????????? ?????? ????????????');

    const roles = (await existedUser.roles).map(role => role.name);

    const token = await this.jwtService.signAsync({ user: existedUser.email });
    return {
      token,
      user: existedUser.email,
      roles,
    };
  }
}