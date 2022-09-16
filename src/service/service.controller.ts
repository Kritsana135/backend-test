import {
  Controller,
  Get,
  Version,
  Param,
  NotFoundException,
  Post,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ServiceService } from './service.service';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get('/')
  @Version('1')
  findAll() {
    return this.serviceService.findAll();
  }

  @Get('/:id')
  @Version('1')
  async findById(@Param('id') id) {
    const service = await this.serviceService.findOne(id);
    if (service) {
      return service;
    } else {
      throw new NotFoundException();
    }
  }

  @Post('/:id/booking')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  async booking(@Param('id') serviceId, @Request() req) {
    const { user } = req;
    if (!user.userId) {
      throw new UnauthorizedException();
    }
    this.serviceService.booking(serviceId, req.user.userId);
    return {
      message: 'Booking success',
    };
  }
}
