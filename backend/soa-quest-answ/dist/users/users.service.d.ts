import { User } from './users.model';
export declare class UsersService {
    private userModel;
    constructor(userModel: typeof User);
    create(newUser: User): Promise<User>;
    findOne(id: number): Promise<User>;
    findByUsername(username: string): Promise<User>;
    findAll(): Promise<User[]>;
    update(id: number, updateUser: User): Promise<User>;
    remove(id: number): Promise<void>;
}
