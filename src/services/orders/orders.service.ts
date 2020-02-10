import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateOrderDto} from "../../dtos/orders/create-order.dto";
import {GetOrderFilterDto} from "../../dtos/orders/get-order.dto";
import { OrderRepository } from '../../repositories/order.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Order} from '../../entities/order.entity';
import { OrderStatus } from '../../models/orders/order.model';

@Injectable()
export class OrdersService {
    constructor(
      @InjectRepository(OrderRepository)
      private orderRepository: OrderRepository
    ) {

    }
    async getOrders(filterDto: GetOrderFilterDto): Promise<Order[]> {
        return this.orderRepository.getOrders(filterDto);
    }

    async getOrderById(id: number): Promise<Order> {
        const found = await this.orderRepository.findOne(id);

        if(!found) {
            throw new NotFoundException(`Task with id-${id} not found`);
        }

        return found;
    }

    async deleteOrder(id: number): Promise<void> {
      const result = await this.orderRepository.delete(id);

      if(result.affected === 0) {
          throw new NotFoundException(`Order with id-${id} not found`);
      }
    }

    async updateOrderStatus(id: number, status: OrderStatus): Promise<Order> {
        const order = await this.getOrderById(id);
              order.status = status;
              await order.save();

        return order;
    }

    async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
       return this.orderRepository.createOrder(createOrderDto)
    }
}