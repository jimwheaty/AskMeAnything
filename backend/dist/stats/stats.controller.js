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
exports.StatsController = void 0;
const common_1 = require("@nestjs/common");
const stats_service_1 = require("./stats.service");
let StatsController = class StatsController {
    constructor(statsService) {
        this.statsService = statsService;
    }
    getPopularTags(limit) {
        return this.statsService.getPopularTags(limit);
    }
    getQuestionsByDate(userId, year, month) {
        return this.statsService.getQuestionsByDate(userId, year, month);
    }
    getAnswersByDate(userId, year, month) {
        return this.statsService.getAnswersByDate(userId, year, month);
    }
};
__decorate([
    common_1.Get('/popular-tags'),
    __param(0, common_1.Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StatsController.prototype, "getPopularTags", null);
__decorate([
    common_1.Get('questions-by-date'),
    __param(0, common_1.Query('userId')), __param(1, common_1.Query('year')), __param(2, common_1.Query('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], StatsController.prototype, "getQuestionsByDate", null);
__decorate([
    common_1.Get('answers-by-date'),
    __param(0, common_1.Query('userId')), __param(1, common_1.Query('year')), __param(2, common_1.Query('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], StatsController.prototype, "getAnswersByDate", null);
StatsController = __decorate([
    common_1.Controller('stats'),
    __metadata("design:paramtypes", [stats_service_1.StatsService])
], StatsController);
exports.StatsController = StatsController;
//# sourceMappingURL=stats.controller.js.map