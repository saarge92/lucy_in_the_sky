import { Column, Entity, Index } from 'typeorm';
import { EntityDate } from '../../common/entity.date';

@Entity({ name: 'user_in_roles', engine: 'InnoDB' })
@Index(['userId', 'roleId'], { unique: true })
export class UserInRoleEntity extends EntityDate {
  @Column({ name: 'user_id', type: 'int', primary: true })
  userId: number;

  @Column({ name: 'role_id', type: 'int', primary: true })
  roleId: number;
}