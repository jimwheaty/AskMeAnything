import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'


@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        const { password, ...result } = user;

        return (user.password === pass)? result: null;
    }

    async login(user: any) {
        const payload = { 
            username: user.username, 
            sub: user.id 
        };
        return { access_token: this.jwtService.sign(payload) };
    }

}
