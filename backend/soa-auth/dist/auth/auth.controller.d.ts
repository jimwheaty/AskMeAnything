import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        userId: any;
        access_token: string;
    }>;
    loggedIn(data: any): Promise<any>;
    getUserFromJWT(jwt: any): Promise<any>;
}
