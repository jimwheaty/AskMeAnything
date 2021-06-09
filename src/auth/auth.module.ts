import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy';

const jwtModule = JwtModule.register({
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '600s' }
});

@Module({
  imports: [
    UsersModule, 
    PassportModule, 
    jwtModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController], 
  exports: [jwtModule, AuthService]
})
export class AuthModule {}
