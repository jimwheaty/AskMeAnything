import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { AuthController } from "./auth.controller";
import constants from "./constants";

@Module({
  imports: [
    ClientsModule.register([{
      name: 'USER_CLIENT',
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379'
      }
    }]),
    JwtModule.register({
      secret: constants.jwtSecret,
      signOptions: { expiresIn: '600s' }
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}