import { Column, Entity, ManyToOne, JoinColumn, Index, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { EntityDate } from '../../common/entity.date';

@Entity({ name: 'user_in_roles', engine: 'InnoDB' })
export class UserInRoleEntity extends EntityDate {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', nullable: true, type: 'int' })
  userId: number;

  @Column({ name: 'role_id', nullable: true, type: 'int' })
  roleId: number;
}