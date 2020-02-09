import { Injectable } from '@nestjs/common';
import { Order, OrderStatus } from '../../models/orders/order.model';
import * as uuid from 'uuid/v1';

@Injectable()
export class OrdersService {
  private orders: Order[] = [];

  getAllOrders(): Order[] {
    return this.orders;
  }

  createOrder(title: string, description: string): Order {
    const order: Order = {
      id: uuid(),
      title,
      description,
      status: OrderStatus.OPEN,
    };

    this.orders.push(order);
    return order;
  }
}