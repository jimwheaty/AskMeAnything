import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from './tags.model';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag)
    private tagModel: typeof Tag
    ) {}

  create(newTag: Tag): Promise<Tag> {
    if (!newTag.field) {
      throw new BadRequestException('Missing field of the tag');
    }
    return this.tagModel.create(newTag);
  }

  async findAll(): Promise<Tag[]> {
    return this.tagModel.findAll();
  }

  async findOne(id: number): Promise<Tag> {
    const tag = await this.tagModel.findOne({
      where: { id },
    });
    if (!tag) {
      throw new NotFoundException(`Tag with id ${id} not found!`);
    }

    await tag.save();
    return tag;
  }

  async update(id: number, tagUpdate: Tag): Promise<Tag> {
    const tag = await this.tagModel.findByPk(id);
    if (!tag) {
      throw new NotFoundException(`Tag with id ${id} not found!`);
    }
    if (tagUpdate.field) {
      tag.field = tagUpdate.field;
    }

    await tag.save();
    return tag;
  }

  async remove(id: number): Promise<void> {
    const tag = await this.findOne(id);
    await tag.destroy();
  }
}
