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
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const sequelize_3 = require("sequelize");
const answer_model_1 = require("../answer/answer.model");
const question_model_1 = require("../question/question.model");
const tags_model_1 = require("../tags/tags.model");
let StatsService = class StatsService {
    constructor(tagModel, questionModel, answerModel) {
        this.tagModel = tagModel;
        this.questionModel = questionModel;
        this.answerModel = answerModel;
    }
    async getQuestionsByDate(userId, year, month) {
        if (!userId)
            userId = 'all';
        if (!year)
            throw new common_1.BadRequestException('missing year parameter');
        if (!month)
            throw new common_1.BadRequestException('missing month parameter');
        if (userId === 'all') {
            const questions = await this.questionModel.findAll({
                attributes: [
                    [sequelize_3.Sequelize.literal(`DATE("createdAt")`), 'date'],
                    [sequelize_3.Sequelize.literal(`strftime('%Y',"createdAt")`), 'year'],
                    [sequelize_3.Sequelize.literal(`strftime('%m',"createdAt")`), 'month'],
                    [sequelize_3.Sequelize.literal(`strftime('%d',"createdAt")`), 'day'],
                    [sequelize_3.Sequelize.literal(`COUNT(*)`), 'count']
                ],
                group: 'date',
                where: {
                    '$year$': year,
                    '$month$': month
                }
            });
            if (!questions)
                return [];
            return questions;
        }
        else {
            const questions = await this.questionModel.findAll({
                attributes: [
                    [sequelize_3.Sequelize.literal(`DATE("createdAt")`), 'date'],
                    [sequelize_3.Sequelize.literal(`strftime('%Y',"createdAt")`), 'year'],
                    [sequelize_3.Sequelize.literal(`strftime('%m',"createdAt")`), 'month'],
                    [sequelize_3.Sequelize.literal(`strftime('%d',"createdAt")`), 'day'],
                    [sequelize_3.Sequelize.literal(`COUNT(*)`), 'count']
                ],
                group: 'date',
                where: {
                    userId,
                    '$year$': year,
                    '$month$': month
                }
            });
            if (!questions)
                return [];
            return questions;
        }
    }
    async getAnswersByDate(userId, year, month) {
        if (!userId)
            userId = 'all';
        if (!year)
            throw new common_1.BadRequestException('missing year parameter');
        if (!month)
            throw new common_1.BadRequestException('missing month parameter');
        if (userId === 'all') {
            let answers = await this.answerModel.findAll({
                attributes: [
                    [sequelize_3.Sequelize.literal(`DATE("createdAt")`), 'date'],
                    [sequelize_3.Sequelize.literal(`strftime('%Y',"createdAt")`), 'year'],
                    [sequelize_3.Sequelize.literal(`strftime('%m',"createdAt")`), 'month'],
                    [sequelize_3.Sequelize.literal(`strftime('%d',"createdAt")`), 'day'],
                    [sequelize_3.Sequelize.literal(`COUNT(*)`), 'count']
                ],
                group: 'date',
                where: {
                    '$year$': year,
                    '$month$': month
                }
            });
            if (!answers)
                return [];
            return answers;
        }
        else {
            const answers = await this.answerModel.findAll({
                attributes: [
                    [sequelize_3.Sequelize.literal(`DATE("createdAt")`), 'date'],
                    [sequelize_3.Sequelize.literal(`strftime('%Y',"createdAt")`), 'year'],
                    [sequelize_3.Sequelize.literal(`strftime('%m',"createdAt")`), 'month'],
                    [sequelize_3.Sequelize.literal(`strftime('%d',"createdAt")`), 'day'],
                    [sequelize_3.Sequelize.literal(`COUNT(*)`), 'count']
                ],
                group: 'date',
                where: {
                    userId,
                    '$year$': year,
                    '$month$': month
                }
            });
            if (!answers)
                return [];
            return answers;
        }
    }
    async getPopularTags(limit) {
        if (!limit)
            limit = 'all';
        const popularTags = await this.tagModel.findAll({
            attributes: [
                'field',
                [sequelize_3.Sequelize.fn('COUNT'), 'count']
            ],
            order: [[sequelize_2.default.literal('count'), 'DESC']],
            group: 'field',
        });
        if (!popularTags)
            return [];
        return limit === 'all' ? popularTags : popularTags.slice(0, parseInt(limit));
    }
};
StatsService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(tags_model_1.Tag)),
    __param(1, sequelize_1.InjectModel(question_model_1.Question)),
    __param(2, sequelize_1.InjectModel(answer_model_1.Answer)),
    __metadata("design:paramtypes", [Object, Object, Object])
], StatsService);
exports.StatsService = StatsService;
//# sourceMappingURL=stats.service.js.map