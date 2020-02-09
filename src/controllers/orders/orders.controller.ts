import {Controller, Get, Post, Body} from '@nestjs/common';
import {OrdersService} from '../../services/orders/orders.service';
import {Order} from '../../models/orders/order.model';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {
    }

    @Get()
    getAllOrders(): Order[] {
        return this.ordersService.getAllOrders();
    }

    @Post()
    createTask(
       @Body('title') title: string,
       @Body('description') description: string
    ): Order {
       return this.ordersService.createOrder(title, description);
    }
}