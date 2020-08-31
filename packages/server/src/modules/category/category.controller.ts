import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

@Controller('category')
@UseGuards(RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * 添加标签
   * @param category
   */
  @Post()
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  create(@Body() category) {
    return this.categoryService.create(category);
  }

  /**
   * 获取所有标签
   */
  @Get()
  findAll(@Query() queryParams): Promise<Category[]> {
    return this.categoryService.findAll(queryParams);
  }

  /**
   * 获取指定标签
   * @param id
   */
  @Get(':id')
  findById(@Param('id') id) {
    return this.categoryService.findById(id);
  }

  /**
   * 更新标签
   * @param id
   * @param category
   */
  @Patch(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  updateById(@Param('id') id, @Body() category) {
    return this.categoryService.updateById(id, category);
  }

  /**
   * 删除标签
   * @param id
   */
  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  deleteById(@Param('id') id) {
    return this.categoryService.deleteById(id);
  }
}
