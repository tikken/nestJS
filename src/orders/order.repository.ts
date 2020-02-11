import { EntityRepository, Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './create-order.dto';
import { OrderStatus } from './order.model';
import { GetOrderFilterDto } from './get-order.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {

  async getOrders(
    filterDto: GetOrderFilterDto,
    user: User,
  ): Promise<Order[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('order');

    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('order.status = :status', { status });
    }

    if (search) {
      query.andWhere('(order.title LIKE :search OR order.description LIKE :search)', { search: `%${search}%` });
    }

    const orders = await query.getMany();
    return orders;
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    user: User,
  ): Promise<Order> {
    const { title, description } = createOrderDto;
    const order = new Order();

    order.title = title;
    order.description = description;
    order.status = OrderStatus.OPEN;
    order.user = user;

    await order.save();

    delete order.user;

    return order;
  }
};