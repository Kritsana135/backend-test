import { Controller, Get, Version, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Version('1')
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    return this.ordersService.findAll(req.user.userId);
  }
}
