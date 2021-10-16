import { JwtService } from '@nestjs/jwt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  createToken(user: Partial<User>) {
    const accessToken = this.jwtService.sign(user);
    return accessToken;
  }

  async login(user: Partial<User>) {
    const data = await this.userService.login(user);
    const token = this.createToken({
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    });
    return Object.assign(data, { token });
  }

  async checkAdmin() {
    return true;
  }

  async validateUser(payload: User) {
    const user = await this.userService.findById(payload.id);
    return user;
  }

  async loginWithGithub(code) {
    if (!code) {
      throw new HttpException('请输入Gitub授权码', HttpStatus.BAD_REQUEST);
    }

    try {
      const tokenResponse = (await axios({
        method: 'post',
        url:
          'https://github.com/login/oauth/access_token?' +
          `client_id=${this.configService.get('GITHUB_CLIENT_ID')}&` +
          `client_secret=${this.configService.get('GITHUB_CLIENT_SECRET')}&` +
          `code=${code}`,
        headers: {
          accept: 'application/json',
        },
      })) as any;
      const accessToken = tokenResponse.data.access_token;
      const result = (await axios({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: {
          accept: 'application/json',
          Authorization: `token ${accessToken}`,
        },
      })) as any;

      if (result.data.email) {
        const user = {
          name: result.data.name,
          avatar: result.data.avatar_url,
          email: result.data.email,
          password: result.data.email,
          type: 'github',
        };
        await this.userService.createUser(user).catch((e) => {
          // 用户已存在
        });
        const res = await this.login(user);
        delete res.password;
        // TODO: 向用户发送信息
        return res;
      } else {
        throw new HttpException(
          '未获取到您的公开邮件地址，无法使用Github登录',
          HttpStatus.BAD_REQUEST
        );
      }
    } catch (e) {
      throw new HttpException(e.message || e, HttpStatus.BAD_REQUEST);
    }
  }
}
