import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SettingModule } from '../setting/setting.module';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { File } from './file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File]), AuthModule, SettingModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
