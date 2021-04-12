import { Column, Entity, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';
import { User } from './user.entity';
import { EntityDate } from '../../common/entity.date';

@Entity({ name: 'roles', engine: 'InnoDB' })
export class Role extends EntityDate {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', scale: 255, nullable: false, name: 'name' })
  name: string;

  @JoinTable({
    name: 'user_in_roles',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: Promise<Array<Role>>;

}