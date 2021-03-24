import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../user/entity/role.entity';
import { Repository } from 'typeorm';
import { Command } from 'nestjs-command';

@Injectable()
export class RoleSeeder {
  private readonly roles: Array<string> = ['User', 'Admin'];

  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {
  }

  @Command({ command: 'seed-roles', describe: 'seed roles', autoExit: true })
  public async seedUser(): Promise<void> {
    for (const role of this.roles) {
      const newRoleRecord = new Role();
      newRoleRecord.name = role;
      await this.roleRepository.save(newRoleRecord);
    }
  }
}