import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
    private orders = [];

    getAllOrders() {
        return this.orders;
    }
}
