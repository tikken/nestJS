import {Controller, Get, Post, Body, Param, Delete} from '@nestjs/common';
import {OrdersService} from '../../services/orders/orders.service';
import {Order} from '../../models/orders/order.model';
import {CreateOrderDto} from '../../dtos/orders/create-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {
    }

    @Get()
    getAllOrders(): Order[] {
        return this.ordersService.getAllOrders();
    }

    @Get("/:id")
    getOrderById(@Param('id') id: string): Order {
        return this.ordersService.getOrderById(id);
    }

    @Delete("/:id")
    deleteOrder(@Param('id') id: string):void {
        console.log('controller', id);
        return this.ordersService.deleteOrder(id);
    }

    @Post()
    createTask(
        //stink way

        // @Body('title') title: string,
        // @Body('description') description: string

        @Body() createOrderDto: CreateOrderDto
    ): Order {
        return this.ordersService.createOrder(createOrderDto);
    }
}