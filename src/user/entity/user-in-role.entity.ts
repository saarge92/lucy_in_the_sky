import { Column, Entity, ManyToOne, JoinColumn, Index, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity({ name: ' user_in_roles' })
export class UserInRoleEntity {

  @Column({ name: 'user_id', nullable: true, type: 'int' })
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User | null;

  @Column({ name: 'role_id', nullable: true, type: 'int' })
  @PrimaryColumn()
  roleId: number;

  @ManyToOne(() => Role, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: Role | null;
}