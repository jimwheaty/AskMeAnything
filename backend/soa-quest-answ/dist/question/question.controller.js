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
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const question_service_1 = require("./question.service");
const question_model_1 = require("./question.model");
const auth_guard_1 = require("../answer/auth.guard");
const jwt_1 = require("@nestjs/jwt");
const microservices_1 = require("@nestjs/microservices");
let QuestionController = class QuestionController {
    constructor(questionService, jwtService) {
        this.questionService = questionService;
        this.jwtService = jwtService;
    }
    create(newQuestion, req) {
        var _a;
        const accessToken = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const userId = this.jwtService.decode(accessToken).sub;
        newQuestion.userId = userId;
        return this.questionService.create(newQuestion);
    }
    getQuestionsByDate(userId, year, month) {
        return this.questionService.getQuestionsByDate(userId, year, month);
    }
    findAll() {
        return this.questionService.findAll();
    }
    findPerUser(userId, limit) {
        return this.questionService.findPerUser(userId, limit);
    }
    findPerTag(tag, limit) {
        return this.questionService.findPerTag(tag, limit);
    }
    findOne(id) {
        return this.questionService.findOne(id);
    }
    update(id, updateQuestion) {
        return this.questionService.update(id, updateQuestion);
    }
    remove(id) {
        return this.questionService.remove(id);
    }
};
__decorate([
    common_1.UseGuards(auth_guard_1.ClientAuthGuard),
    common_1.Post(),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [question_model_1.Question, Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "create", null);
__decorate([
    microservices_1.MessagePattern({ role: 'stats', cmd: 'questions' }),
    __param(0, microservices_1.Payload('userId')), __param(1, microservices_1.Payload('year')), __param(2, microservices_1.Payload('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "getQuestionsByDate", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findAll", null);
__decorate([
    common_1.Get('per-user'),
    __param(0, common_1.Query('userId')), __param(1, common_1.Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findPerUser", null);
__decorate([
    common_1.Get('per-tag'),
    __param(0, common_1.Query('tag')), __param(1, common_1.Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findPerTag", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findOne", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, question_model_1.Question]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "remove", null);
QuestionController = __decorate([
    common_1.Controller('questions'),
    __metadata("design:paramtypes", [question_service_1.QuestionService,
        jwt_1.JwtService])
], QuestionController);
exports.QuestionController = QuestionController;
//# sourceMappingURL=question.controller.js.map