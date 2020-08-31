import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

const passModule = PassportModule.register({ defaultStrategy: 'jwt' });
const jwtModule = JwtModule.register({
  secret: 'wipi',
  signOptions: { expiresIn: '4h' },
});

@Module({
  imports: [UserModule, passModule, jwtModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [passModule, jwtModule],
})
export class AuthModule {}
