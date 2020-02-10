import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { CreateOrderDto } from '../dtos/orders/create-order.dto';
import { OrderStatus } from '../models/orders/order.model';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { title, description } = createOrderDto;
    const order = new Order();

    order.title = title;
    order.description = description;
    order.status = OrderStatus.OPEN;

    await order.save();

    return order;
  }
};