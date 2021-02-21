import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ViewService } from './view.service';
import { ViewController } from './view.controller';
import { View } from './view.entity';

@Module({
  imports: [TypeOrmModule.forFeature([View]), AuthModule],
  exports: [ViewService],
  providers: [ViewService],
  controllers: [ViewController],
})
export class ViewModule {}
