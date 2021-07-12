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
exports.AnswerController = void 0;
const common_1 = require("@nestjs/common");
const answer_service_1 = require("./answer.service");
const microservices_1 = require("@nestjs/microservices");
let AnswerController = class AnswerController {
    constructor(answerService) {
        this.answerService = answerService;
    }
    findAll() {
        return this.answerService.findAll();
    }
    findPerUser(userId, limit) {
        return this.answerService.findPerUser(userId, limit);
    }
    findPerQuestion(questionId) {
        return this.answerService.findPerQuestion(questionId);
    }
    findOne(id) {
        return this.answerService.findOne(id);
    }
    remove(id) {
        return this.answerService.remove(id);
    }
};
__decorate([
    microservices_1.MessagePattern('findAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "findAll", null);
__decorate([
    microservices_1.MessagePattern('findPerUser'),
    __param(0, microservices_1.Payload('userId')), __param(1, microservices_1.Payload('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "findPerUser", null);
__decorate([
    microservices_1.MessagePattern('findPerQuestion'),
    __param(0, microservices_1.Payload('questionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "findPerQuestion", null);
__decorate([
    microservices_1.MessagePattern('findOne'),
    __param(0, microservices_1.Payload('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "findOne", null);
__decorate([
    microservices_1.MessagePattern('remove'),
    __param(0, microservices_1.Payload('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "remove", null);
AnswerController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [answer_service_1.AnswerService])
], AnswerController);
exports.AnswerController = AnswerController;
//# sourceMappingURL=answer.controller.js.map