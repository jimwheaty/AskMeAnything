import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        const { password, ...result } = user;

        return (user.password === pass)? result: null;
    }

}
