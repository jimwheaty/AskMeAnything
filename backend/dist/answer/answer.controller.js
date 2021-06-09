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
const answer_model_1 = require("./answer.model");
const passport_1 = require("@nestjs/passport");
let AnswerController = class AnswerController {
    constructor(answerService) {
        this.answerService = answerService;
    }
    create(newAnswer, req) {
        newAnswer.userId = req.user.id;
        return this.answerService.create(newAnswer);
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
    update(id, updateAnswer) {
        return this.answerService.update(id, updateAnswer);
    }
    remove(id) {
        return this.answerService.remove(id);
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Post(),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [answer_model_1.Answer, Object]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "findAll", null);
__decorate([
    common_1.Get('per-user'),
    __param(0, common_1.Query('userId')), __param(1, common_1.Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "findPerUser", null);
__decorate([
    common_1.Get('per-question'),
    __param(0, common_1.Query('questionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "findPerQuestion", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "findOne", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, answer_model_1.Answer]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "remove", null);
AnswerController = __decorate([
    common_1.Controller('answers'),
    __metadata("design:paramtypes", [answer_service_1.AnswerService])
], AnswerController);
exports.AnswerController = AnswerController;
//# sourceMappingURL=answer.controller.js.map