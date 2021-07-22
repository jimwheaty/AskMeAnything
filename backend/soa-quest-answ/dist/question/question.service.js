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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const answer_model_1 = require("../answer/answer.model");
const tags_model_1 = require("../tags/tags.model");
const users_model_1 = require("../users/users.model");
const question_model_1 = require("./question.model");
let QuestionService = class QuestionService {
    constructor(questionModel, tagModel) {
        this.questionModel = questionModel;
        this.tagModel = tagModel;
    }
    async findAll() {
        const questions = await this.questionModel.findAll({
            include: [{
                    model: answer_model_1.Answer,
                    as: 'answers',
                    attributes: ['body']
                }, {
                    model: tags_model_1.Tag,
                    as: 'tags',
                    attributes: ['field'],
                }, {
                    model: users_model_1.User,
                    as: 'user',
                    attributes: ['username'],
                }]
        });
        if (!questions)
            return [];
        let sortedQuestions = [...questions].sort((a, b) => b.updatedAt - a.updatedAt);
        return sortedQuestions;
    }
    async findOne(id) {
        const question = await this.questionModel.findOne({
            where: { id },
            include: [{
                    model: answer_model_1.Answer,
                    as: 'answers'
                }, {
                    model: tags_model_1.Tag,
                    as: 'tags',
                    attributes: ['field'],
                }, {
                    model: users_model_1.User,
                    as: 'user',
                    attributes: ['username'],
                }],
        });
        if (!question) {
            throw new common_1.NotFoundException(`Question with id ${id} not found!`);
        }
        question.views++;
        await question.save();
        return question;
    }
    async findPerUser(userId, limit) {
        if (!userId)
            throw new common_1.BadRequestException('Missing userId');
        if (!limit)
            limit = 'all';
        const questions = await this.questionModel.findAll({
            where: { userId },
            include: [{
                    model: answer_model_1.Answer,
                    as: 'answers'
                }, {
                    model: tags_model_1.Tag,
                    as: 'tags',
                    attributes: ['field'],
                }, {
                    model: users_model_1.User,
                    as: 'user',
                    attributes: ['username'],
                }]
        });
        if (!questions)
            return [];
        const sortedQuestions = [...questions].sort((a, b) => b.createdAt - a.createdAt);
        if (limit === 'all')
            return sortedQuestions;
        else
            return sortedQuestions.slice(0, parseInt(limit));
    }
    async findPerTag(tag, limit) {
        if (!tag)
            throw new common_1.BadRequestException('Missing tag');
        if (!limit)
            limit = 'all';
        const questionsPerTag = await this.questionModel.findAll({
            where: {
                '$tags.field$': tag
            },
            include: {
                model: tags_model_1.Tag,
                as: 'tags',
                attributes: ['field'],
            }
        });
        if (!questionsPerTag)
            return [];
        const sortedQuestions = [...questionsPerTag].sort((a, b) => a.createdAt - b.createdAt);
        return (limit === 'all') ? sortedQuestions : sortedQuestions.slice(0, parseInt(limit));
    }
    create(question) {
        if (!question.title || !question.body) {
            throw new common_1.BadRequestException('Missing title or body of the question');
        }
        return this.questionModel.create(question);
    }
    async update(id, questionUpdate) {
        const question = await this.questionModel.findByPk(id);
        if (!question) {
            throw new common_1.NotFoundException(`Question with id ${id} not found!`);
        }
        question.title = questionUpdate.title ? questionUpdate.title : question.title;
        question.body = questionUpdate.body ? questionUpdate.body : question.body;
        question.views = questionUpdate.views ? questionUpdate.views : question.views;
        question.upVotes = questionUpdate.upVotes ? questionUpdate.upVotes : question.upVotes;
        await question.save();
        return question;
    }
    async remove(id) {
        const question = await this.findOne(id);
        await question.destroy();
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
                    [sequelize_2.Sequelize.literal(`DATE("createdAt")`), 'date'],
                    [sequelize_2.Sequelize.literal(`strftime('%Y',"createdAt")`), 'year'],
                    [sequelize_2.Sequelize.literal(`strftime('%m',"createdAt")`), 'month'],
                    [sequelize_2.Sequelize.literal(`strftime('%d',"createdAt")`), 'day'],
                    [sequelize_2.Sequelize.literal(`COUNT(*)`), 'count']
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
                    [sequelize_2.Sequelize.literal(`DATE("createdAt")`), 'date'],
                    [sequelize_2.Sequelize.literal(`strftime('%Y',"createdAt")`), 'year'],
                    [sequelize_2.Sequelize.literal(`strftime('%m',"createdAt")`), 'month'],
                    [sequelize_2.Sequelize.literal(`strftime('%d',"createdAt")`), 'day'],
                    [sequelize_2.Sequelize.literal(`COUNT(*)`), 'count']
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
};
QuestionService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(question_model_1.Question)),
    __param(1, sequelize_1.InjectModel(tags_model_1.Tag)),
    __metadata("design:paramtypes", [Object, Object])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map