import { Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
  exports: [ConfigModule, DatabaseModule],
})
export class CommonModule {}
