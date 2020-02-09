import { OrderStatus } from "../../models/orders/order.model";
import {IsOptional, IsIn, IsNotEmpty} from "class-validator";

export class GetOrderFilterDto {
    @IsOptional()
    @IsIn([OrderStatus.OPEN, OrderStatus.IN_PROGRESS, OrderStatus.DELIVERING, OrderStatus.DONE])
    status: OrderStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}