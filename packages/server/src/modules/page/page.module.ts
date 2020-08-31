import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { Page } from './page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Page]), AuthModule],
  exports: [PageService],
  providers: [PageService],
  controllers: [PageController],
})
export class PageModule {}
