import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { Tag } from './tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), AuthModule],
  exports: [TagService],
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
