import { Injectable } from '@nestjs/common';
import { Order } from "../../models/orders/order.model";

@Injectable()
export class OrdersService {
    private orders: Order[] = [];

    getAllOrders(): Order[] {
        return this.orders;
    }
}
