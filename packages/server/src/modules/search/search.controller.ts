import { Controller, Get, Delete, Param, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
// import { client } from './elasticsearch.client';
import { SearchService } from './search.service';

@Controller('search')
@UseGuards(RolesGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  /**
   * 搜索文章
   * @param keyword
   */
  @Get('/article')
  async searchArticle(@Query('keyword') keyword) {
    const data = await this.searchService.searchArticle('article', keyword);
    return data;
  }

  /**
   * 获取搜索记录
   */
  @Get('/')
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() queryParam) {
    return this.searchService.findAll(queryParam);
  }

  /**
   * 删除文件
   * @param id
   */
  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  deleteById(@Param('id') id) {
    return this.searchService.deleteById(id);
  }
}
