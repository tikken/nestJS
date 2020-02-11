import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { OrderStatus } from './order.model';
import { User } from '../auth/user.entity';

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

  @Column()
  userId: number;

  @ManyToOne(type => User, user => user.orders, { eager: false })
  user: User;

}