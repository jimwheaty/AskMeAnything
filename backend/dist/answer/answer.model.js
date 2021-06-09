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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Answer = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const question_model_1 = require("../question/question.model");
const users_model_1 = require("../users/users.model");
let Answer = class Answer extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Answer.prototype, "body", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Answer.prototype, "upVotes", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => users_model_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Answer.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => question_model_1.Question),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Answer.prototype, "questionId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => users_model_1.User),
    __metadata("design:type", users_model_1.User)
], Answer.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => question_model_1.Question),
    __metadata("design:type", question_model_1.Question)
], Answer.prototype, "question", void 0);
Answer = __decorate([
    sequelize_typescript_1.Table
], Answer);
exports.Answer = Answer;
//# sourceMappingURL=answer.model.js.map