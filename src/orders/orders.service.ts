import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/common/entites/booking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  findAll(userId: number) {
    return this.bookingRepository
      .createQueryBuilder('booking')
      .innerJoin('booking.customer', 'customer', 'customer._id = :userId', {
        userId,
      })
      .addSelect('customer._id')
      .addSelect('customer.fullName')
      .addSelect('customer.username')
      .leftJoinAndSelect('booking.service', 'service')
      .getMany();
  }
}
