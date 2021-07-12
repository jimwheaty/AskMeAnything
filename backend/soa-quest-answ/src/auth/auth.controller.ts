import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    // @UseGuards(AuthGuard('local'))
    @MessagePattern('login')
    async login(@Payload('user') user) {
        return this.authService.login(user);
    }
}