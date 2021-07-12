import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @MessagePattern('login')
    async login(@Payload('username') username, @Payload('password') password) {
        return this.authService.login(username, password);
    }
}