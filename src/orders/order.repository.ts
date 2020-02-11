import { EntityRepository, Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './create-order.dto';
import { OrderStatus } from './order.model';
import { GetOrderFilterDto } from './get-order.dto';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {

  async getOrders(filterDto: GetOrderFilterDto): Promise<Order[]> {
      const { status, search } = filterDto;
      const query = this.createQueryBuilder('order');

      if(status) {
          query.andWhere('order.status = :status', { status });
      }

      if(search) {
          query.andWhere('(order.title LIKE :search OR order.description LIKE :search)', { search: `%${search}%` });
      }

      const orders = await query.getMany();
      return orders;
  }

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