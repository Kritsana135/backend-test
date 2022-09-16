import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '../common/entites/service.entity';
import { Booking } from '../common/entites/booking.entity';
import { User } from 'src/common/entites/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service, Booking, User])],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
