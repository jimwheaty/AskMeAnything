import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginMicro(data: any): Promise<{
        userId: any;
        access_token: string;
    }>;
    loggedIn(data: any): Promise<any>;
}
