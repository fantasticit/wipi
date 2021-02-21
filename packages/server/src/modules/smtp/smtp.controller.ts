import { Controller, Get, Post, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { SMTPService } from './smtp.service';
import { SMTP } from './smtp.entity';

@Controller('smtp')
@UseGuards(RolesGuard)
export class SMTPController {
  constructor(private readonly smtpService: SMTPService) {}

  /**
   * 发送邮件
   * @param data
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() data) {
    return this.smtpService.create(data);
  }

  /**
   * 获取所有邮件记录
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() queryParam) {
    return this.smtpService.findAll(queryParam);
  }

  /**
   * 删除邮件记录
   * @param id
   */
  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  deleteById(@Param('id') id) {
    return this.smtpService.deleteById(id);
  }
}
