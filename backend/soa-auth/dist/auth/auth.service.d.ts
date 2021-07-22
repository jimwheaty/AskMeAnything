import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly client;
    private readonly jwtService;
    constructor(client: ClientProxy, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<{
        userId: any;
        access_token: string;
    }>;
    validateToken(jwt: string): any;
    getUserFromJWT(jwt: string): any;
}
