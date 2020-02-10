import { Module } from '@nestjs/common';
import { OrdersModule } from './modules/orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [OrdersModule, TypeOrmModule.forRoot(typeOrmConfig), AuthModule, ProductModule],
  controllers: [],
  providers: [],
})

export class AppModule {
}