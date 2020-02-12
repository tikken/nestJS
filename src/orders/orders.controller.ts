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
  UseGuards, Logger,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './create-order.dto';
import { GetOrderFilterDto } from './get-order.dto';
import { OrderStatusValidationPipe } from './order-status-validation.pipe';
import { Order } from './order.entity';
import { OrderStatus } from './order.model';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('orders')
@UseGuards(AuthGuard())
export class OrdersController {
  private logger = new Logger('OrdersController')

  constructor(private ordersService: OrdersService) {
  }

  //http://localhost:3000/orders?status=OPEN&search=4m
  @Get()
  getOrders(
    @Query(ValidationPipe) filterDto: GetOrderFilterDto,
    @GetUser() user: User): Promise<Order[]> {

    this.logger.verbose(`User ${user.username} retrieving all task. ${JSON.stringify(filterDto)}`);

    return this.ordersService.getOrders(filterDto, user);
  }

  @Get('/:id')
  getOrderById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Order> {
    return this.ordersService.getOrderById(id, user);
  }

  //ex http://localhost:3000/orders/542f71c0-4b4a-11ea-bb05-ff95b8fcea8d/status
  @Patch('/:id/status')
  updateOrderStatus(
    @Param('id') id: number,
    @GetUser() user: User,
    @Body('status', OrderStatusValidationPipe) status: OrderStatus,
  ): Promise<Order> {
    return this.ordersService.updateOrderStatus(id, status, user);
  }

  @Delete('/:id')
  deleteOrder(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ):
  Promise<void> {
    return this.ordersService.deleteOrder(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createOrder(
    //stink way
    // @Body('title') title: string,
    // @Body('description') description: string
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User,
  ): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto, user);
  }
}