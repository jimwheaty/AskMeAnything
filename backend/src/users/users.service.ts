import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User)
        private userModel: typeof User
    ) {}

    async create(newUser: User): Promise<User> {
        if (!newUser.password || !newUser.username) {
            throw new BadRequestException('Missing username, password or email')
        }
        return await this.userModel.create(newUser);
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userModel.findByPk(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found!`);
        }
        return user;
    }

    async findByUsername(username: string): Promise<User> {
        const user = await this.userModel.findOne({
            where: { username },
            raw: true
        });
        if (!user) {
            throw new NotFoundException(`User with username ${username} not found!`);
        }
        return user;
    }

    findAll(): Promise<User[]> {
        return this.userModel.findAll()
    }

    async update(id: number, updateUser: User): Promise<User> {
        const user = await this.findOne(id);
        user.username = updateUser.username? updateUser.username: user.username;
        user.email = updateUser.email? updateUser.email: user.email;
        user.password = updateUser.password? updateUser.password: user.password;
        user.bio = updateUser.bio? updateUser.bio: user.bio;
        
        await user.save();
        return user;
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        await user.destroy();   
    }


}
