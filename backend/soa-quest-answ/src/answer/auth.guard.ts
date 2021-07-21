import { CanActivate, ExecutionContext, Inject, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

export class ClientAuthGuard implements CanActivate {
    constructor(
      @Inject('AUTH_CLIENT')
      private readonly client: ClientProxy
    ) {}
  
    async canActivate(context: ExecutionContext,): Promise<any> {
      const req = context.switchToHttp().getRequest();
  
      try{
        const res = await this.client.send(
          { role: 'auth', cmd: 'check' },
          { jwt: req.headers['authorization']?.split(' ')[1]});
  
          return res;
      } catch(err) {
        Logger.error(err);
        return false;
      }
    }
  }
