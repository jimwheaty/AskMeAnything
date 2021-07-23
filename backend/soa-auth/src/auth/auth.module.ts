import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { AuthController } from "./auth.controller";
import constants from "./constants";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    ClientsModule.register([{
      name: 'USER_CLIENT',
      transport: Transport.REDIS,
      options: {
        url: 'rediss://default:ej4guzrqldi52xrs@redis-35c975f8-elkritsotakis-26da.aivencloud.com:24185'
      }
    }]),
    // ClientsModule.register([{
    //   name: 'USER_CLIENT',
    //   transport: Transport.TCP,
    //   options: {
    //     host: '127.0.0.1',
    //     port: 8080,
    //   }
    // }]),
    JwtModule.register({
      secret: constants.jwtSecret,
      signOptions: { expiresIn: '600s' }
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}