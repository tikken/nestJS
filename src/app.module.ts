import { Module } from '@nestjs/common';
import { OrdersModule } from './modules/orders/orders.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "./config/typeorm.config";

@Module({
  imports: [OrdersModule,TypeOrmModule.forRoot(typeOrmConfig)]
})

export class AppModule {}