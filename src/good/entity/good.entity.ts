import { EntityDate } from 'src/common/entity.date';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'goods' })
export class Good extends EntityDate {
  @PrimaryGeneratedColumn({ type: 'int' })
  public id: number;

  @Column({ nullable: false, type: 'varchar' })
  public name: string;
}