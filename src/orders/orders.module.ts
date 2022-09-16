import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/common/entites/user.entity';
import { Service } from 'src/common/entites/service.entity';
import { Booking } from 'src/common/entites/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Service, Booking])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
