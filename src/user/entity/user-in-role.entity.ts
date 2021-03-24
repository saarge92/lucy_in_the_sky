import { Column, Entity, ManyToOne, JoinColumn, Index, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';
import { EntityDate } from '../../common/entity.date';

@Entity({ name: ' user_in_roles' })
@Index(['roleId', 'userId'], { unique: true })
export class UserInRoleEntity extends EntityDate {

  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'user_id', nullable: true, type: 'int' })
  userId: number;

  @ManyToOne(() => User, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User | null;

  @Column({ name: 'role_id', nullable: true, type: 'int' })
  roleId: number;

  @ManyToOne(() => Role, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: Role | null;
}