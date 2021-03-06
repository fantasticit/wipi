import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { KnowledgeService } from './knowledge.service';
import { KnowledgeController } from './knowledge.controller';
import { Knowledge } from './knowledge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Knowledge]), AuthModule],
  exports: [KnowledgeService],
  providers: [KnowledgeService],
  controllers: [KnowledgeController],
})
export class KnowledgeModule {}
