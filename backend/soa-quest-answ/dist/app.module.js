"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const answer_module_1 = require("./answer/answer.module");
const question_module_1 = require("./question/question.module");
const users_module_1 = require("./users/users.module");
const tags_module_1 = require("./tags/tags.module");
const sequelizeModule = sequelize_1.SequelizeModule.forRoot({
    database: './database.db',
    storage: './database.db',
    dialect: 'sqlite',
    autoLoadModels: true,
    synchronize: true,
    sync: { force: false },
    dialectOptions: { connectTimeout: 10000 },
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
});
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            sequelizeModule,
            question_module_1.QuestionModule,
            answer_module_1.AnswerModule,
            users_module_1.UsersModule,
            tags_module_1.TagsModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map