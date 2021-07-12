import { Body, Controller, Param, Post, Req, Request, UseGuards } from "@nestjs/common";
import { ClientOptions, ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {
    private authClient: ClientProxy;

    constructor() {
  
      const connectionOptions: ClientOptions = {
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8877,
        }
      };

      this.authClient = ClientProxyFactory.create(connectionOptions);
    }

    @Post('login')
    login(@Body() payload) {
      return this.authClient.send<any,any>('login', payload);
    }
}