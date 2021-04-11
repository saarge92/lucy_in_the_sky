import { CreateRoleDto } from '../dto/create-role.dto';
import { Observable } from 'rxjs';
import { Role } from '../../user/entity/role.entity';

export interface IRoleService {
  createRole(roleDto: CreateRoleDto): Promise<Observable<Role>>;

  getAllRoles(): Promise<Array<Role>>;

  getRoleById(id: number): Promise<Role>;

  deleteRole(id: number): Promise<void>;
}