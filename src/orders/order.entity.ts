import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {OrderStatus} from "./order.model";

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: OrderStatus;
}