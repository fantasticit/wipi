import { Controller, Post, Get, Delete, Param, Query, UseGuards, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { PosterService } from './poster.service';
import { Poster } from './poster.entity';

@ApiTags('Poster')
@Controller('poster')
@UseGuards(RolesGuard)
export class PosterController {
  constructor(private readonly service: PosterService) {}

  @ApiResponse({ status: 200, description: '生成海报', type: [Poster] })
  @Post('')
  uploadFile(@Body() data) {
    return this.service.createPoster(data);
  }

  @Get()
  findAll(@Query() queryParam) {
    return this.service.findAll(queryParam);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  deleteById(@Param('id') id) {
    return this.service.deleteById(id);
  }
}
