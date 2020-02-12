import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Order } from '../orders/order.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  // @Column('text', {nullable: true})
  // lastname: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(type => Order, order => order.user, { eager: true })
  orders: Order[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}