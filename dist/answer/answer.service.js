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
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const question_model_1 = require("../question/question.model");
const answer_model_1 = require("./answer.model");
let AnswerService = class AnswerService {
    constructor(answerModel, questionModel) {
        this.answerModel = answerModel;
        this.questionModel = questionModel;
    }
    create(newAnswer) {
        if (!newAnswer.body) {
            throw new common_1.BadRequestException('Cannot create an empty answer');
        }
        return this.answerModel.create(newAnswer);
    }
    findAll() {
        return this.answerModel.findAll();
    }
    async findPerUser(userId, limit) {
        if (!userId)
            throw new common_1.BadRequestException('Missing userId');
        if (!limit)
            limit = 'all';
        const answers = await this.answerModel.findAll({
            where: { userId }
        });
        if (!answers)
            return [];
        const sortedAnswers = [...answers].sort((a, b) => b.createdAt - a.createdAt);
        return (limit === 'all') ? sortedAnswers : sortedAnswers.slice(0, parseInt(limit));
    }
    async findPerQuestion(questionId) {
        if (!questionId)
            throw new common_1.BadRequestException('Missing questionId');
        let answersPerQuestion = await this.questionModel.findByPk(questionId, {
            include: {
                model: answer_model_1.Answer,
                as: 'answers'
            }
        });
        answersPerQuestion.answers = answersPerQuestion.answers.sort((a, b) => b.upVotes - a.upVotes);
        return answersPerQuestion;
    }
    async findOne(id) {
        const answer = await this.answerModel.findByPk(id);
        if (!answer) {
            throw new common_1.NotFoundException(`Answer with id ${id} not found!`);
        }
        return answer;
    }
    async update(id, answerUpdate) {
        const answer = await this.findOne(id);
        answer.body = answerUpdate.body ? answerUpdate.body : answer.body;
        answer.upVotes = answerUpdate.upVotes ? answerUpdate.upVotes : answer.upVotes;
        await answer.save();
        return answer;
    }
    async remove(id) {
        const answer = await this.findOne(id);
        await answer.destroy();
    }
};
AnswerService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(answer_model_1.Answer)),
    __param(1, sequelize_1.InjectModel(question_model_1.Question)),
    __metadata("design:paramtypes", [Object, Object])
], AnswerService);
exports.AnswerService = AnswerService;
//# sourceMappingURL=answer.service.js.map