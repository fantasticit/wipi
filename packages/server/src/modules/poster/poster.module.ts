import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SettingModule } from '../setting/setting.module';
import { PosterController } from './poster.controller';
import { PosterService } from './poster.service';
import { Poster } from './poster.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Poster]), AuthModule, SettingModule],
  controllers: [PosterController],
  providers: [PosterService],
})
export class PosterModule {}
