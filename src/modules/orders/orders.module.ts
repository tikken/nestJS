import {Module} from '@nestjs/common';
import {OrdersController} from '../../controllers/orders/orders.controller';
import {OrdersService} from '../../services/orders/orders.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderRepository} from "../../repositories/order.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderRepository])
    ],
    controllers: [OrdersController],
    providers: [OrdersService]
})

export class OrdersModule {}