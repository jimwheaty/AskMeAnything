"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("./users.model");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(newUser) {
        if (!newUser.password || !newUser.username) {
            throw new common_1.BadRequestException('Missing username, password or email');
        }
        return await this.userModel.create(newUser);
    }
    async findOne(id) {
        const user = await this.userModel.findByPk(id);
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} not found!`);
        }
        return user;
    }
    async findByUsername(username) {
        const user = await this.userModel.findOne({
            where: { username },
            raw: true
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with username ${username} not found!`);
        }
        return user;
    }
    findAll() {
        return this.userModel.findAll();
    }
    async update(id, updateUser) {
        const user = await this.findOne(id);
        user.username = updateUser.username ? updateUser.username : user.username;
        user.email = updateUser.email ? updateUser.email : user.email;
        user.password = updateUser.password ? updateUser.password : user.password;
        user.bio = updateUser.bio ? updateUser.bio : user.bio;
        await user.save();
        return user;
    }
    async remove(id) {
        const user = await this.findOne(id);
        await user.destroy();
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(users_model_1.User)),
    __metadata("design:paramtypes", [Object])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map