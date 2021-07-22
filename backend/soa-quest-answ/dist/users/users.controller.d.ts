import { UsersService } from './users.service';
import { User } from './users.model';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findByUsername(data: any): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    createUser(newUser: User): Promise<User>;
    update(id: number, updateUser: User): Promise<User>;
    remove(id: number): Promise<void>;
}
