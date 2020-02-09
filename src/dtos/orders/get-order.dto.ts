import { OrderStatus } from "../../models/orders/order.model";

export class GetOrderFilterDto {
    status: OrderStatus;
    search: string;
}