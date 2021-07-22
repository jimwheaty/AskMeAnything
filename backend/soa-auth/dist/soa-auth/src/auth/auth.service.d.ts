import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../soa-quest-answ/src/users/users.model';
export declare class AuthService {
    private readonly client;
    private readonly jwtService;
    constructor(client: ClientProxy, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<User> | null;
    login(user: any): Promise<{
        userId: any;
        access_token: string;
    }>;
    validateToken(jwt: string): any;
}
