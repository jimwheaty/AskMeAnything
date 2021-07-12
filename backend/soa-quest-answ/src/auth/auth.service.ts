import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/users/users.model';


@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        const { password, ...result } = user;

        return (password === pass)? result: new UnauthorizedException('invalid username or password');
    }

    async login(username: string, password: string) {
        const user = await this.validateUser(username, password);

        const payload = { 
            username: user.username, 
            sub: user.id 
        };
        return { access_token: this.jwtService.sign(payload) };
    }
}