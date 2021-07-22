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
const sequelize_typescript_1 = require("sequelize-typescript");
const question_model_1 = require("./question.model");
let Tag = class Tag extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Tag.prototype, "field", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => question_model_1.Question),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Tag.prototype, "questionId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => question_model_1.Question),
    __metadata("design:type", question_model_1.Question)
], Tag.prototype, "question", void 0);
Tag = __decorate([
    sequelize_typescript_1.Table({
        timestamps: false
    })
], Tag);
exports.Tag = Tag;
//# sourceMappingURL=tags.model.js.map