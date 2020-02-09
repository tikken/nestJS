import {Controller, Get, Post, Body, Param, Delete, Patch, Query} from '@nestjs/common';
import {OrdersService} from '../../services/orders/orders.service';
import {Order, OrderStatus} from '../../models/orders/order.model';
import {CreateOrderDto} from '../../dtos/orders/create-order.dto';
import {GetOrderFilterDto} from "../../dtos/orders/get-order.dto";

@Controller('orders')
export class OrdersController {
        constructor(private ordersService: OrdersService) {
    }

    // http://localhost:3000/orders?status=OPEN&search=4m
    @Get()
    getOrders(@Query() filterDto: GetOrderFilterDto): Order[] {

        if(Object.keys(filterDto).length) {
            return this.ordersService.getOrdersWithFilters(filterDto);
        } else {
            return this.ordersService.getAllOrders();
        }

        console.log(filterDto);
    }

    @Get("/:id")
    getOrderById(@Param('id') id: string): Order {
        return this.ordersService.getOrderById(id);
    }

    //ex http://localhost:3000/orders/542f71c0-4b4a-11ea-bb05-ff95b8fcea8d/status
    @Patch("/:id/status")
    updateOrderStatus(
        @Param('id') id: string,
        @Body('status') status: OrderStatus
    ): Order {
        return this.ordersService.updateOrderStatus(id, status);
    }

    @Delete("/:id")
    deleteOrder(@Param('id') id: string): void {
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