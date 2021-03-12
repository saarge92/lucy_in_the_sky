import { EntityDate } from 'src/common/entity.date';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User extends EntityDate {
  @PrimaryGeneratedColumn({ type: 'int' })
  public id: number;

  @Column({ name: 'email', nullable: false, unique: true })
  public email: string;

  @Column({ name: 'password', nullable: false })
  public password: string;
}