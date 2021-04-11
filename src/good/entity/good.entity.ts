import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityDate } from '../../common/entity.date';

@Entity({ name: 'goods' })
export class Good extends EntityDate {
  @PrimaryGeneratedColumn({ type: 'int' })
  public id: number;

  @Column({ nullable: false, type: 'varchar' })
  public name: string;
}