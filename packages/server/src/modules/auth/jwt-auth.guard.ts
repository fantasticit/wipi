import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    return request;
  }

  handleRequest<User>(err, user: User): User {
    if (err || !user) {
      throw new UnauthorizedException('身份验证失败');
    }
    return user;
  }
}
