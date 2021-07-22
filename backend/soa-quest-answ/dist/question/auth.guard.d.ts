import { CanActivate, ExecutionContext } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
export declare class ClientAuthGuard implements CanActivate {
    private readonly client;
    constructor(client: ClientProxy);
    canActivate(context: ExecutionContext): Promise<any>;
}
