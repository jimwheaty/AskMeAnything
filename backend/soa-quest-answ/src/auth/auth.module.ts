import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [
    UsersModule, 
    PassportModule, 
    JwtModule.register({
      secret: 'saas-5',
      signOptions: { expiresIn: '600s' }
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController], 
  exports: [AuthService]
})
export class AuthModule {}
