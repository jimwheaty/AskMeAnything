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
exports.TagsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const tags_model_1 = require("./tags.model");
let TagsService = class TagsService {
    constructor(tagModel) {
        this.tagModel = tagModel;
    }
    create(newTag) {
        if (!newTag.field) {
            throw new common_1.BadRequestException('Missing field of the tag');
        }
        return this.tagModel.create(newTag);
    }
    async findAll() {
        return this.tagModel.findAll();
    }
    async findOne(id) {
        const tag = await this.tagModel.findOne({
            where: { id },
        });
        if (!tag) {
            throw new common_1.NotFoundException(`Tag with id ${id} not found!`);
        }
        await tag.save();
        return tag;
    }
    async update(id, tagUpdate) {
        const tag = await this.tagModel.findByPk(id);
        if (!tag) {
            throw new common_1.NotFoundException(`Tag with id ${id} not found!`);
        }
        if (tagUpdate.field) {
            tag.field = tagUpdate.field;
        }
        await tag.save();
        return tag;
    }
    async remove(id) {
        const tag = await this.findOne(id);
        await tag.destroy();
    }
    async getPopularTags(limit) {
        if (!limit)
            limit = 'all';
        const popularTags = await this.tagModel.findAll({
            attributes: [
                'field',
                [sequelize_2.Sequelize.fn('COUNT'), 'count']
            ],
            order: [[sequelize_2.Sequelize.literal('count'), 'DESC']],
            group: 'field',
        });
        if (!popularTags)
            return [];
        return limit === 'all' ? popularTags : popularTags.slice(0, parseInt(limit));
    }
};
TagsService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(tags_model_1.Tag)),
    __metadata("design:paramtypes", [Object])
], TagsService);
exports.TagsService = TagsService;
//# sourceMappingURL=tags.service.js.map