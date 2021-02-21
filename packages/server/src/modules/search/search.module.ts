import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ArticleModule } from '../article/article.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { Search } from './search.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Search]), AuthModule, ArticleModule],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
