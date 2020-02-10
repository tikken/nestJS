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
    //
    //
    // getOrdersWithFilters(filterDto: GetOrderFilterDto): Order[] {
    //     const {status, search} = filterDto;
    //
    //     let orders = this.getAllOrders();
    //
    //     if(status) {
    //         orders = orders.filter(order => order.status === status);
    //     }
    //
    //     if(search) {
    //         orders = orders.filter(
    //             order => order.title.includes(search) ||
    //             order.description.includes(search)
    //         )
    //     }
    //
    //     return orders;
    // }
    //
    // getAllOrders(): Order[] {
    //     return this.orders;
    // }
    //
    async getOrderById(id: number): Promise<Order> {
        const found = await this.orderRepository.findOne(id);

        if(!found) {
            throw new NotFoundException(`Task with id-${id} not found`);
        }

        return found;
    }
    //
    // deleteOrder(id: string): void {
    //     const found = this.getOrderById(id);
    //
    //     this.orders = this.orders.filter(order => order.id != found.id);
    // }
    //
    // updateOrderStatus(id: string, status: OrderStatus): Order {
    //     const order = this.getOrderById(id);
    //     order.status = status;
    //     // console.log(id, status, order, 'service');
    //     return order;
    // }
    //
    async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
       return this.orderRepository.createOrder(createOrderDto)
    }
}