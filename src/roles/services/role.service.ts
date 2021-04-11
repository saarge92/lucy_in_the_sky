import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, of } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { Role } from '../../user/entity/role.entity';
import { IRoleService } from '../interfaces/role-service-interface';

@Injectable()
export class RoleService implements IRoleService {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {
  }

  public async createRole(roleDto: CreateRoleDto): Promise<Observable<Role>> {
    const role = new Role();
    role.name = roleDto.name;
    await this.roleRepository.save(role);
    return of(role);
  }

  public async getAllRoles(): Promise<Array<Role>> {
    return this.roleRepository.find();
  }

  public async getRoleById(id: number): Promise<Role> {
    return await this.roleRepository.findOne(id);
  }

  public async deleteRole(id: number): Promise<void> {
    const role = await this.roleRepository.findOne(id);
    if (!role)
      throw new NotFoundException('Такая роль не найдена');
    await this.roleRepository.delete(role);
  }
}