import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { Setting } from './setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Setting]), UserModule, AuthModule],
  exports: [SettingService],
  providers: [SettingService],
  controllers: [SettingController],
})
export class SettingModule {}
