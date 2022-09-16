import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entites/user.entity';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { Booking } from '../common/entites/booking.entity';
import { Service } from '../common/entites/service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.initService();
  }

  async initService() {
    const mockData = [
      {
        name: 'ทำความสะอาดทั่วไป 2 ชั่วโมง',
        price: 549,
        picture:
          'https://seekster-company.oss-ap-southeast-1.aliyuncs.com/workforce-candidate-test/iYmjLjwjf7g58zKekycw2Ts9',
        description:
          '\nเหมาะสำหรับ: คอนโด อพาร์ทเม้นท์\n\n• ห้องนอนสตูดิโอ\n\n• ขนาดพื้นที่ประมาณ 25-40 ตร.ม.\n\n⚠️สถานที่หน้างานนั้นต้องสามารถใช้น้ำประปาและไฟฟ้าระหว่างเข้าให้บริการได้ \n\nTips\n\n💡 แนะนำให้จองบริการล่วงหน้าอย่างน้อย 1 วันเพื่อให้แม่บ้านได้มีเวลาเตรียมอุปกรณ์ทำความสะอาดสำหรับลูกค้านะคะ :)',
      },
      {
        name: 'อบพ่นฆ่าเชื้อ',
        price: 4815,
        picture:
          'https://seekster-company.oss-ap-southeast-1.aliyuncs.com/workforce-candidate-test/FvipYUiFKCLeeL1KCe6fx5Dc',
        description: 'พ่นฆ่าเชื้อโรค (ขนาดพื้นที่ 1-100 ตร.ม.)',
      },
      {
        name: 'ล้างแอร์(แบบติดผนัง 9,000-18,000 BTU)',
        price: 549,
        picture:
          'https://seekster-company.oss-ap-southeast-1.aliyuncs.com/workforce-candidate-test/2SsKf5hWDj7dgoZVSidBhKr2',
        description:
          'สำหรับล้างแอร์แบบติดผนังขนาด 9,000-18,000 BTU เท่านั้น\n\n💡 หากแอร์มีอาการน้ำหยด กรุณาจอง ซ่อมแอร์ \n\n💡 แนะนำให้จองล่วงหน้าอย่างน้อย 3 วัน ในกรณีที่เป็นการจองบริการเข้ามาแบบกระทันหัน บริษัทขออนุญาตติดต่อกลับไปเพื่อหาช่วงเวลาใหม่ให้ \n\n💡 พื้นที่เขตปริมณฑล อาจจะมีผู้ให้บริการไม่เพียงพอต่อการรับงาน',
      },
    ];
    const service = await this.servicesRepository.find();
    if (service.length === 0) {
      await this.servicesRepository.save(mockData);
    }
  }

  findAll() {
    return this.servicesRepository.find();
  }

  findOne(id: number) {
    return this.servicesRepository.findOneBy({ _id: id });
  }

  async booking(serviceId: number, userId: number) {
    const service = await this.findOne(serviceId);
    const customer = await this.userRepository.findOneBy({ _id: userId });
    if (!service || !customer) {
      throw new Error('Service or customer not found');
    }
    this.bookingRepository.save({ customer, service });
  }
}
