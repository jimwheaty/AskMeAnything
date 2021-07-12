import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(user: any): Promise<{
        access_token: string;
    }>;
}
