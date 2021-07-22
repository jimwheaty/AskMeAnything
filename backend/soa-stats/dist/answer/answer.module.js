"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerModule = void 0;
const common_1 = require("@nestjs/common");
const answer_service_1 = require("./answer.service");
const answer_controller_1 = require("./answer.controller");
const sequelize_1 = require("@nestjs/sequelize");
const answer_model_1 = require("./answer.model");
const question_model_1 = require("../question/question.model");
const microservices_1 = require("@nestjs/microservices");
const jwt_1 = require("@nestjs/jwt");
let AnswerModule = class AnswerModule {
};
AnswerModule = __decorate([
    common_1.Module({
        imports: [
            sequelize_1.SequelizeModule.forFeature([answer_model_1.Answer, question_model_1.Question]),
            microservices_1.ClientsModule.register([{
                    name: 'AUTH_CLIENT',
                    transport: microservices_1.Transport.REDIS,
                    options: {
                        url: 'redis://localhost:6379'
                    }
                }]),
            jwt_1.JwtModule.register({
                secret: 'saas-5',
                signOptions: { expiresIn: '6000s' }
            }),
        ],
        controllers: [answer_controller_1.AnswerController],
        providers: [answer_service_1.AnswerService],
        exports: [answer_service_1.AnswerService]
    })
], AnswerModule);
exports.AnswerModule = AnswerModule;
//# sourceMappingURL=answer.module.js.map