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
exports.Question = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const answer_model_1 = require("../answer/answer.model");
const tags_model_1 = require("../tags/tags.model");
const users_model_1 = require("../users/users.model");
let Question = class Question extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Question.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Question.prototype, "body", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Question.prototype, "views", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Question.prototype, "upVotes", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => users_model_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Question.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => answer_model_1.Answer),
    __metadata("design:type", Array)
], Question.prototype, "answers", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => users_model_1.User),
    __metadata("design:type", users_model_1.User)
], Question.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => tags_model_1.Tag),
    __metadata("design:type", Array)
], Question.prototype, "tags", void 0);
Question = __decorate([
    sequelize_typescript_1.Table
], Question);
exports.Question = Question;
//# sourceMappingURL=question.model.js.map