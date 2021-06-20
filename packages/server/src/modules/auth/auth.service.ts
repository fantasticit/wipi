import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

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
}
