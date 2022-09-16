import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Booking } from './booking.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  picture: string;

  @Column()
  description: string;

  @OneToMany(() => Booking, (booking) => booking.service)
  bookings: Booking[];
}
