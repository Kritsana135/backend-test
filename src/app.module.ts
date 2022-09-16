import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { OrdersModule } from './orders/orders.module';
import { ServiceModule } from './service/service.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    CommonModule,
    UserModule,
    ServiceModule,
    OrdersModule,
  ],
})
export class AppModule {}
