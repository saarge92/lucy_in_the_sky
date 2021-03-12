import { EntityDate } from "src/common/entity.date";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'goods' })
export class Good extends EntityDate {
    @PrimaryGeneratedColumn({ type: 'int' })
    public id: number;

    @Column({ name: 'name', nullable: false, unique: true })
    public name: string;
}