import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {CreateOrderDto} from './create-order.dto';
import {GetOrderFilterDto} from "./get-order.dto";
import {OrderStatusValidationPipe} from "./order-status-validation.pipe";
import { Order } from './order.entity';
import { OrderStatus } from './order.model';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {
    }

    //http://localhost:3000/orders?status=OPEN&search=4m
    @Get()
    getOrders(@Query(ValidationPipe) filterDto: GetOrderFilterDto): Promise<Order[]> {
        return this.ordersService.getOrders(filterDto);
    }

    @Get("/:id")
    getOrderById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
        return this.ordersService.getOrderById(id);
    }

    //ex http://localhost:3000/orders/542f71c0-4b4a-11ea-bb05-ff95b8fcea8d/status
    @Patch("/:id/status")
    updateOrderStatus(
        @Param('id') id: number,
        @Body('status', OrderStatusValidationPipe) status: OrderStatus
    ): Promise<Order> {
        return this.ordersService.updateOrderStatus(id, status);
    }

    @Delete("/:id")
    deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
       return this.ordersService.deleteOrder(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createOrder(
        //stink way
        // @Body('title') title: string,
        // @Body('description') description: string
        @Body() createOrderDto: CreateOrderDto
    ): Promise<Order> {
        return this.ordersService.createOrder(createOrderDto);
    }
}