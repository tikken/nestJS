import {Injectable, NotFoundException} from '@nestjs/common';
import {Order, OrderStatus} from '../../models/orders/order.model';
import * as uuid from 'uuid/v1';
import {CreateOrderDto} from "../../dtos/orders/create-order.dto";
import {GetOrderFilterDto} from "../../dtos/orders/get-order.dto";

@Injectable()
export class OrdersService {
    private orders: Order[] = [];


    getOrdersWithFilters(filterDto: GetOrderFilterDto): Order[] {
        const {status, search} = filterDto;

        let orders = this.getAllOrders();

        if(status) {
            orders = orders.filter(order => order.status === status);
        }

        if(search) {
            orders = orders.filter(
                order => order.title.includes(search) ||
                order.description.includes(search)
            )
        }

        return orders;
    }

    getAllOrders(): Order[] {
        return this.orders;
    }

    getOrderById(id: string): Order {
        const found = this.orders.find(task => task.id === id);

        if(!found) {
            throw new NotFoundException(`Task with id-${id} not found`);
        }

        return found;
    }

    deleteOrder(id: string): void {
        const found = this.getOrderById(id);

        this.orders = this.orders.filter(order => order.id != found.id);
    }

    updateOrderStatus(id: string, status: OrderStatus): Order {
        const order = this.getOrderById(id);
        order.status = status;
        // console.log(id, status, order, 'service');
        return order;
    }

    createOrder(createOrderDto: CreateOrderDto): Order {
        const {title, description} = createOrderDto;

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