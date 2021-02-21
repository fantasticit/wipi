import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SettingModule } from '../setting/setting.module';
import { SMTPService } from './smtp.service';
import { SMTPController } from './smtp.controller';
import { SMTP } from './smtp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SMTP]), SettingModule, AuthModule],
  exports: [SMTPService],
  controllers: [SMTPController],
  providers: [SMTPService],
})
export class SMTPModule {}
