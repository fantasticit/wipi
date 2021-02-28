import { Controller, Post, Body, Request, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { SettingService } from './setting.service';
import { Setting } from './setting.entity';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { User } from '../user/user.entity';

@ApiTags('Setting')
@Controller('setting')
@UseGuards(RolesGuard)
export class SettingController {
  constructor(
    private readonly settingService: SettingService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  /**
   * 更新设置
   * @param tag
   */
  @ApiResponse({ status: 200, description: '更新设置', type: [Setting] })
  @Post()
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  update(@Body() setting) {
    return this.settingService.update(setting);
  }

  /**
   * 获取设置
   */
  @Post('/get')
  @HttpCode(HttpStatus.OK)
  async findAll(@Request() req): Promise<Setting> {
    let token = req.headers.authorization;

    if (/Bearer/.test(token)) {
      // 不需要 Bearer，否则验证失败
      token = token.split(' ').pop();
    }

    try {
      const tokenUser = this.jwtService.decode(token) as User;
      const id = tokenUser.id;
      const exist = await this.userService.findById(id);
      const isAdmin = id && exist.role === 'admin';
      return this.settingService.findAll(false, isAdmin);
    } catch (e) {
      return this.settingService.findAll(false, false);
    }
  }
}
