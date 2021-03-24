import { EntityDate } from 'src/common/entity.date';
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity({ name: 'users' })
export class User extends EntityDate {
  @PrimaryGeneratedColumn({ type: 'int' })
  public id: number;

  @Column({ name: 'email', nullable: false, unique: true })
  public email: string;

  @Column({ name: 'password', nullable: false })
  public password: string;

  @OneToMany(() => Role, role => role.users, { lazy: true })
  @JoinTable({
    name: 'user_in_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Array<Role>;

}