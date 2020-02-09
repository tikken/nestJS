import { Controller, Get } from '@nestjs/common';
import { OrdersService } from "../../services/orders/orders.service";
import { Order } from "../../models/orders/order.model";

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService ) {};

    @Get()
    getAllOrders():Order[] {
        return this.ordersService.getAllOrders();
    }
}